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
    private commandCallDetails: client.Counter<string>;
    private numOfCommandErrors: client.Counter<string>;
    private commandErrorsDetails: client.Counter<string>;
    private commandAllRequestTotal: client.Counter<string>;
    private commandAllSuccessTotal: client.Counter<string>;
    private commandAllErrorsTotal: client.Counter<string>;
    private commandAllClientErrorTotal: client.Counter<string>;
    private commandAllServerErrorTotal: client.Counter<string>;
    private commandAllRequestInProcessingTotal: client.Gauge<string>;
    private commandRequestDurationMilliseconds: client.Histogram<string>;
    private commandRequestDurationSeconds: client.Summary<string>;
    private commandRequestSizeBytes: client.Histogram<string>;
    private commandResponseSizeBytes: client.Histogram<string>;

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
            labelNames: ['command', 'data']
        });

        this.commandCallDetails = new client.Counter({
            name: 'commandCallDetails',
            help: 'Details of command calls made',
            labelNames: ['command', 'key', 'data', 'ecc']
        });

        this.numOfCommandErrors = new client.Counter({
            name: 'numOfCommandErrors',
            help: 'Number of command ended in error',
            labelNames: ['command']
        });

        this.commandErrorsDetails = new client.Counter({
            name: 'commandErrorsDetails',
            help: 'Number of command ended in error with error details',
            labelNames: ['command', 'key', 'data', 'ecc']
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

        // # HELP api_all_client_error_total The total number of all API requests with client error response
        // # TYPE api_all_client_error_total counter
        // TODO: add client error codes
        this.commandAllClientErrorTotal = new client.Counter({
            name: 'command_all_client_error_total',
            help: 'The total number of all command requests with client error response'
        });

        // # HELP api_all_server_error_total The total number of all API requests with server error response
        // # TYPE api_all_server_error_total counter
        // TODO: add server error codes
        this.commandAllServerErrorTotal = new client.Counter({
            name: 'command_all_server_error_total',
            help: 'The total number of all command requests with server error response'
        });

        // # HELP api_all_request_in_processing_total The total number of all API requests currently in processing (no response yet)
        // # TYPE api_all_request_in_processing_total gauge
        // TODO: add request in processing
        this.commandAllRequestInProcessingTotal = new client.Gauge({
            name: 'command_all_request_in_processing_total',
            help: 'The total number of all command requests currently in processing (no response yet)'
        });

        // # HELP api_request_duration_milliseconds API requests duration
        // # TYPE api_request_duration_milliseconds histogram
        // Start with request received till response sent
        this.commandRequestDurationMilliseconds = new client.Histogram({
            name: 'command_request_duration_milliseconds',
            help: 'Command requests duration in milliseconds',
            labelNames: ['command', 'data'],
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

        // # HELP api_response_size_bytes API requests size
        // # TYPE api_response_size_bytes histogram

        this.commandResponseSizeBytes = new client.Histogram({
            name: 'command_response_size_bytes',
            help: 'Command response size',
            labelNames: ['command'],
            buckets: [0.1, 5, 15, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000]
        });

        this.Register.registerMetric(this.numOfCommandCalls);
        this.Register.registerMetric(this.commandCallDetails);
        this.Register.registerMetric(this.numOfCommandErrors);
        this.Register.registerMetric(this.commandErrorsDetails);
        this.Register.registerMetric(this.commandAllRequestTotal);
        this.Register.registerMetric(this.commandAllSuccessTotal);
        this.Register.registerMetric(this.commandAllErrorsTotal);
        // this.Register.registerMetric(this.commandAllClientErrorTotal);
        // this.Register.registerMetric(this.commandAllServerErrorTotal);
        // this.Register.registerMetric(this.commandAllRequestInProcessingTotal);
        this.Register.registerMetric(this.commandRequestDurationMilliseconds);
        this.Register.registerMetric(this.commandRequestDurationSeconds);
        this.Register.registerMetric(this.commandRequestSizeBytes);
        this.Register.registerMetric(this.commandResponseSizeBytes);

        this.end = this.commandRequestDurationMilliseconds.startTimer();
    }

    endTimer = (ecc: ECCCommand) => this.end({ command: ecc.command });

    countCommandCalls: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
        ecc.startEpoch = Date.now();
        this.numOfCommandCalls.inc({ command: ecc.command, data }, 1);
        this.commandAllRequestTotal.inc(1);
        this.commandRequestSizeBytes.labels(ecc.command).observe(data.length);
    };

    commandDetails: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
        this.commandCallDetails.inc(
            {
                command: ecc.command,
                data,
                ecc: `ECCRESULT - ${JSON.stringify(ecc.eccResult)}  ECCMESSAGE ${
                    ecc.messages.join(', ') || 'No messages'
                }}`
            },
            1
        );
    };

    countCommandErrors: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
        if (ecc.error) {
            this.commandErrorsDetails.inc(
                {
                    command: ecc.command,
                    key,
                    data,
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
        this.commandRequestDurationMilliseconds.labels(ecc.command, data).observe(responseTimeInMilliseconds);
        this.commandRequestDurationSeconds.labels(ecc.command, data).observe(this.endTimer(ecc));
        this.countCommandErrors(key, data, ecc);
        this.commandResponseSizeBytes.labels(ecc.command).observe(ecc.messages.join('').length);
    };
}

const OutboundMetrics = new OutboundMetricsClass();

export { OutboundMetrics };
