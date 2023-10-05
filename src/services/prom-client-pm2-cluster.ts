import * as swStats from 'swagger-stats';
import pm2Cb from 'pm2';
/* If you use Bluebird, it makes using PM2 API easier, creating *Async functions */
import bb from 'bluebird';
const pm2 = bb.Promise.promisifyAll(pm2Cb);
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { InboundMetrics, inbounddMetricsIns } from 'src/services/inbound-metrics';
import { outboundMetricsIns } from 'src/services/outbound-metrics';
import config from 'config';

/** Total timeout for workers, ms */
const TIMEOUT = 2000;
const promClient = swStats.getPromClient();
/** The global message topic for gathering Prometheus metrics */
const TOPIC = 'get_prom_register';
/** Singleton instance of PM2 message bus */
let pm2Bus: { off: (arg0: string) => void; on: (arg0: string, arg1: (packet: ResponsePacket) => void) => void };
const instanceId = Number(process.env.pm_id);
let metrics = config?.metrics;

/* Info returned by pm2.list() */
interface PM2InstanceData {
    pm_id: number;
}

/** Response packet sent to the master instance */
interface ResponsePacket {
    type: string;
    data: {
        instanceId: number;
        register: any;
        success: boolean;
        reqId: string;
    };
}

/** IPC request packet sent from the master instance to the others */
interface RequestPacket {
    topic: 'get_prom_register';
    data: {
        /** ID if the master instance */
        targetInstanceId: number;
        /** Unique request ID to prevent collisions from multiple requests */
        reqId: string;
    };
}

// Every process listens on the IPC channel for the metric request TOPIC,
// Responding with Prometheus metrics when needed.

process.on('message', async (packet: RequestPacket) => {
    try {
        if (packet.topic === TOPIC && process.send) {
            process.send({
                type: `process:${packet.data.targetInstanceId}`,
                data: {
                    instanceId,
                    register: await metricsDataArray(),
                    success: true,
                    reqId: packet.data.reqId
                }
            } as ResponsePacket);
        }
    } catch (e) {
        console.error('Error sending metrics to master node', e);
    }
});

async function requestNeighboursData(instancesData: PM2InstanceData[], reqId: string) {
    const requestData: RequestPacket = {
        topic: TOPIC,
        data: {
            targetInstanceId: instanceId,
            reqId
        }
    };

    let promises = [];
    for (let instanceData of Object.values(instancesData)) {
        let targetId = instanceData.pm_id;
        // Don't send message to self
        if (targetId !== instanceId) {
            promises.push(pm2.sendDataToProcessIdAsync(targetId, requestData).catch((e) => console.error(e)));
        }
    }

    // Resolves when all responses have been received
    return Promise.all(promises);
}

/** Master process gathering aggregated metrics data */
async function getAggregatedRegistry(instancesData: any[]) {
    if (!instancesData || !instancesData.length) {
        return;
    }

    // Assigning a unique request ID
    const reqId = uuidv4();

    const registryPromise = new Promise<any>(async (resolve, reject) => {
        const instancesCount = instancesData.length;
        const registersPerInstance: [Object] = [{}];
        const busEventName = `process:${instanceId}`;
        // Master process metrics
        registersPerInstance[instanceId] = await metricsDataArray();
        let registersReady = 1;

        const finish = () => {
            // Deregister event listener to prevent memory leak
            pm2Bus.off(busEventName);
            resolve(promClient.AggregatorRegistry.aggregate(registersPerInstance));
        };

        // We can only resolve/reject this promise once
        // This safety timeout deregisters the listener in case of an issue
        const timeout = setTimeout(finish, TIMEOUT);

        /** Listens to slave instances' responses */
        pm2Bus.on(busEventName, (packet: ResponsePacket) => {
            try {
                if (packet.data.reqId === reqId) {
                    // Array fills up in order of responses
                    registersPerInstance[packet.data.instanceId] = packet.data.register;
                    registersReady++;

                    if (registersReady === instancesCount) {
                        // Resolve when all responses have been received
                        clearTimeout(timeout);
                        finish();
                    }
                }
            } catch (e) {
                reject(e);
            }
        });
    });

    // Request instance data after the response listener has been set up
    // We are not awaiting, resolution is handled by the bus event listener
    await requestNeighboursData(instancesData, reqId);

    return registryPromise;
}

export async function metricsDataArray(): Promise<any[]> {
    let metricsData: any[] = [];
    if (metrics.outbound) {
        metricsData = await outboundMetricsIns.getMetricsAsJSON();
    }
    if (metrics.inbound) {
        metricsData = metricsData.concat(await inbounddMetricsIns.getMetricsAsJSON());
    }
    return metricsData;
}

export async function metricsDataString(): Promise<string> {
    let metricsData: string = '';
    if (metrics.outbound) {
        metricsData = await outboundMetricsIns.getPromStats();
    }
    if (metrics.inbound) {
        metricsData = metricsData.concat('\n' + (await inbounddMetricsIns.getPromStats()));
    }
    return metricsData;
}

/** Main middleware function */
export default async function getMetricsFromClusters(req: Request, res: Response) {
    return new Promise(async (resolve, reject) => {
        try {
            // Create or use bus singleton
            // Listen to messages from application
            function pm2async(): Promise<any> {
                return new Promise(function (resolve, reject): any {
                    pm2Cb.launchBus(function (err, bus) {
                        if (err) {
                            reject(err);
                        }
                        resolve(bus);
                    });
                });
            }

            pm2async()
                .then(async (bus) => {
                    pm2Bus = bus;
                    // Get current instances (threads) data
                    const instancesData = await pm2.listAsync();
                    res.set('Content-type', swStats.getPromClient().register.contentType);
                    if (instancesData.length > 0) {
                        // Multiple threads - aggregate
                        const register = await getAggregatedRegistry(instancesData);
                        resolve(register.metrics());
                    } else {
                        // 1 thread - send local stats
                        resolve(await metricsDataString());
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (e) {
            reject(e);
        }
    });
}
