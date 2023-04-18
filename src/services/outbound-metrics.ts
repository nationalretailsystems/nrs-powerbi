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
export class OutboundMetricsClass {
    public Register: client.Registry;
    private end: Function;
    private numOfCommandCalls: client.Counter<string>;
    private numOfCommandErrors: client.Counter<string>;
    private commandErrorsDetails: client.Counter<string>;
    private commandAllRequestTotal: client.Counter<string>;
    private commandAllSuccessTotal: client.Counter<string>;
    private commandAllErrorsTotal: client.Counter<string>;
    private commandRequestDurationMilliseconds: client.Histogram<string>;
    private commandRequestDurationSeconds: client.Summary<string>;
    private commandRequestSizeBytes: client.Histogram<string>;

    constructor() {
        this.Register = new client.Registry();
        this.Register.setDefaultLabels({
            prefix: 'ec_outbound_'
        });

        client.collectDefaultMetrics({
            register: this.Register,
            labels: { uuid: uuid.v4() }
        });

        this.numOfCommandCalls = new client.Counter({
            name: 'numOfCommandCalls',
            help: 'Number of command calls made',
            labelNames: ['command']
        });

        this.numOfCommandErrors = new client.Counter({
            name: 'numOfCommandErrors',
            help: 'Number of command ended in error',
            labelNames: ['command']
        });

        this.commandErrorsDetails = new client.Counter({
            name: 'commandErrorsDetails',
            help: 'Number of command ended in error with error details',
            labelNames: ['command', 'key', 'data', 'requestTime','ecc']
        });

        // # HELP api_all_request_total The total number of all API requests received
        // # TYPE api_all_request_total counter

        this.commandAllRequestTotal = new client.Counter({
            name: 'command_all_request_total',
            help: 'The total number of all command requests received'
        });

        // # HELP api_all_success_total The total number of all API requests with success response
        // # TYPE api_all_success_total counter

        this.commandAllSuccessTotal = new client.Counter({
            name: 'command_all_success_total',
            help: 'The total number of all command requests with success response'
        });

        // # HELP api_all_errors_total The total number of all API requests with error response
        // # TYPE api_all_errors_total counter

        this.commandAllErrorsTotal = new client.Counter({
            name: 'command_all_errors_total',
            help: 'The total number of all command requests with error response'
        });

        // # HELP api_request_duration_milliseconds API requests duration
        // # TYPE api_request_duration_milliseconds histogram
        // Start with request received till response sent
        this.commandRequestDurationMilliseconds = new client.Histogram({
            name: 'command_request_duration_milliseconds',
            help: 'Command requests duration in milliseconds',
            labelNames: ['command'],
            buckets: [0.1, 5, 15, 50, 100, 500, 1000, 5000, 10000, 30000, 50000, Infinity]
        });

        this.commandRequestDurationSeconds = new client.Summary({
            name: 'command_request_duration',
            help: 'Command requests duration in seconds',
            labelNames: ['command', 'data'],
            percentiles: [0.5, 0.9, 0.95, 0.99, 0.999, 1, 1.5, 2, 2.5, 3, 5, 10, Infinity]
        });

        // # HELP api_request_size_bytes API requests size
        // # TYPE api_request_size_bytes histogram

        this.commandRequestSizeBytes = new client.Histogram({
            name: 'command_request_size_bytes',
            help: 'Command requests size',
            labelNames: ['command'],
            buckets: [0.1, 1, 2, 3, 4, 5, 10, 20, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000]
        });

        this.Register.registerMetric(this.numOfCommandCalls);
        this.Register.registerMetric(this.numOfCommandErrors);
        this.Register.registerMetric(this.commandErrorsDetails);
        this.Register.registerMetric(this.commandAllRequestTotal);
        this.Register.registerMetric(this.commandAllSuccessTotal);
        this.Register.registerMetric(this.commandAllErrorsTotal);
        this.Register.registerMetric(this.commandRequestDurationMilliseconds);
        this.Register.registerMetric(this.commandRequestDurationSeconds);
        this.Register.registerMetric(this.commandRequestSizeBytes);

        this.end = this.commandRequestDurationMilliseconds.startTimer();
    }

    endTimer = (ecc: ECCCommand) => this.end({ command: ecc.command });

    countCommandCalls: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
        ecc.startEpoch = Date.now();
        this.numOfCommandCalls.inc({ command: ecc.command }, 1);
        this.commandAllRequestTotal.inc(1);
        this.commandRequestSizeBytes.labels(ecc.command).observe(data.length);
    };


    countCommandEnds = (key: string, data: string, ecc: ECCCommand, requestTime: number) => {
        if (ecc.error) {
            this.commandErrorsDetails.inc(
                {
                    command: ecc.command,
                    key,
                    data,
                    requestTime: requestTime.toString(),
                    ecc: `ECCERROR: ${ecc.error}`
                },
                1
            );
            this.numOfCommandErrors.inc({ command: ecc.command }, 1);
            this.commandAllErrorsTotal.inc(1);
        } else {
            this.commandAllSuccessTotal.inc(1);
        }
    };

    // Combine all command handlers into a single function
    afterCommandParams: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
        const responseTimeInMilliseconds = Date.now() - ecc.startEpoch;
        this.commandRequestDurationMilliseconds.labels(ecc.command).observe(responseTimeInMilliseconds);
        this.commandRequestDurationSeconds.labels(ecc.command, data).observe(this.endTimer(ecc));
        this.countCommandEnds(key, data, ecc, Math.floor(responseTimeInMilliseconds/1000));
    };
}

const OutboundMetrics = new OutboundMetricsClass();

export { OutboundMetrics };
