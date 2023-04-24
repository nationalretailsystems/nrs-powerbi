import * as client from 'prom-client';
import { ECCHandlerFunction } from '@eradani-inc/ecc-router/types';
import {
    ECClient,
    ECCRecordConverter,
    RawRequestRecord,
    ECCConfig,
    ECCResponseConverter,
    RawDataRecord,
    RequestKey
} from '@eradani-inc/ec-client';
import { ECCCommand } from '@eradani-inc/ecc-router/types/ecc-handler';
import * as uuid from 'uuid';
import { register } from './shutdown';
export class OutboundMetricsClass {
    public outboundRegister: client.Registry;
    private end: Function;
    private uuid: string;
    private command_num_of_command_calls: client.Counter<string>;
    private command_num_of_command_errors: client.Counter<string>;
    private command_Errors_Details: client.Counter<string>;
    private command_All_Request_Total: client.Counter<string>;
    private command_All_Success_Total: client.Counter<string>;
    private command_All_Errors_Total: client.Counter<string>;
    private command_Request_Duration_Milliseconds: client.Histogram<string>;
    private command_Request_Duration_Seconds: client.Summary<string>;
    private command_Request_Size_Bytes: client.Histogram<string>;

    constructor() {
        this.outboundRegister = new client.Registry();
        this.uuid = uuid.v4();
        this.outboundRegister.setDefaultLabels({
            app: 'eradani-connect',
            type: 'outbound',
            uuid: this.uuid
        });

        this.command_num_of_command_calls = new client.Counter({
            name: 'command_num_of_command_calls',
            help: 'Number of command calls made',
            labelNames: ['command'],
            registers: [this.outboundRegister]
        });

        this.command_num_of_command_errors = new client.Counter({
            name: 'command_num_of_command_errors',
            help: 'Number of command ended in error',
            labelNames: ['command'],
            registers: [this.outboundRegister]
        });

        this.command_Errors_Details = new client.Counter({
            name: 'command_Errors_Details',
            help: 'Number of command ended in error with error details',
            labelNames: ['command', 'key', 'data', 'requestTime', 'ecc'],
            registers: [this.outboundRegister]
        });

        // # HELP api_all_request_total The total number of all API requests received
        // # TYPE api_all_request_total counter

        this.command_All_Request_Total = new client.Counter({
            name: 'command_all_request_total',
            help: 'The total number of all command requests received',
            registers: [this.outboundRegister]
        });

        // # HELP api_all_success_total The total number of all API requests with success response
        // # TYPE api_all_success_total counter

        this.command_All_Success_Total = new client.Counter({
            name: 'command_all_success_total',
            help: 'The total number of all command requests with success response',
            registers: [this.outboundRegister]
        });

        // # HELP api_all_errors_total The total number of all API requests with error response
        // # TYPE api_all_errors_total counter

        this.command_All_Errors_Total = new client.Counter({
            name: 'command_all_errors_total',
            help: 'The total number of all command requests with error response',
            registers: [this.outboundRegister]
        });

        // # HELP api_request_duration_milliseconds API requests duration
        // # TYPE api_request_duration_milliseconds histogram
        // Start with request received till response sent
        this.command_Request_Duration_Milliseconds = new client.Histogram({
            name: 'command_request_duration_milliseconds',
            help: 'Command requests duration in milliseconds',
            labelNames: ['command'],
            buckets: [0.1, 5, 15, 50, 100, 500, 1000, 5000, 10000, 30000, 50000, Infinity],
            registers: [this.outboundRegister]
        });

        this.command_Request_Duration_Seconds = new client.Summary({
            name: 'command_request_duration',
            help: 'Command requests duration in seconds',
            labelNames: ['command', 'data'],
            percentiles: [0.5, 0.9, 0.95, 0.99, 0.999, 1, 1.5, 2, 2.5, 3, 5, 10, Infinity],
            registers: [this.outboundRegister]
        });

        // # HELP api_request_size_bytes API requests size
        // # TYPE api_request_size_bytes histogram

        this.command_Request_Size_Bytes = new client.Histogram({
            name: 'command_request_size_bytes',
            help: 'Command requests size',
            labelNames: ['command'],
            buckets: [0.1, 1, 2, 3, 4, 5, 10, 20, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000],
            registers: [this.outboundRegister]
        });

        this.outboundRegister.registerMetric(this.command_num_of_command_calls);
        this.outboundRegister.registerMetric(this.command_num_of_command_errors);
        this.outboundRegister.registerMetric(this.command_Errors_Details);
        this.outboundRegister.registerMetric(this.command_All_Request_Total);
        this.outboundRegister.registerMetric(this.command_All_Success_Total);
        this.outboundRegister.registerMetric(this.command_All_Errors_Total);
        this.outboundRegister.registerMetric(this.command_Request_Duration_Milliseconds);
        this.outboundRegister.registerMetric(this.command_Request_Duration_Seconds);
        this.outboundRegister.registerMetric(this.command_Request_Size_Bytes);

        this.end = this.command_Request_Duration_Milliseconds.startTimer();
    }

    endTimer = (ecc: ECCCommand) => this.end({ command: ecc.command });

    countCommandCalls: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
        ecc.startEpoch = Date.now();
        this.command_num_of_command_calls.inc({ command: ecc.command }, 1);
        this.command_All_Request_Total.inc(1);
        this.command_Request_Size_Bytes.labels(ecc.command).observe(data.length);
    };

    countCommandEnds = (key: string, data: string, ecc: ECCCommand, requestTime: number) => {
        if (ecc.error) {
            this.command_Errors_Details.inc(
                {
                    command: ecc.command,
                    key,
                    data,
                    requestTime: requestTime.toString(),
                    ecc: `ECCERROR: ${ecc.error}`
                },
                1
            );
            this.command_num_of_command_errors.inc({ command: ecc.command }, 1);
            this.command_All_Errors_Total.inc(1);
        } else {
            this.command_All_Success_Total.inc(1);
        }
    };

    // Combine all command handlers into a single function
    afterCommandParams: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
        const responseTimeInMilliseconds = Date.now() - ecc.startEpoch;
        this.command_Request_Duration_Milliseconds.labels(ecc.command).observe(responseTimeInMilliseconds);
        this.command_Request_Duration_Seconds.labels(ecc.command, data).observe(this.endTimer(ecc));
        this.countCommandEnds(key, data, ecc, Math.floor(responseTimeInMilliseconds / 1000));
    };

    getPromStats = () => {
        return this.outboundRegister.metrics();
    };

    getPromStatsAsJSON = () => {
        return this.outboundRegister.getMetricsAsJSON();
    };
}

const OutboundMetrics = new OutboundMetricsClass();

export { OutboundMetrics };
