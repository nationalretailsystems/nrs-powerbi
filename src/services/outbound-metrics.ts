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

const Register = new client.Registry();

Register.setDefaultLabels({
    app: 'ec-outbound'
});

client.collectDefaultMetrics({ register: Register });

const numOfCommandCalls = new client.Counter({
    name: 'numOfCommandCalls',
    help: 'Number of command calls made',
    labelNames: ['command', 'key', 'data']
});

const commandCallDetails = new client.Counter({
    name: 'commandCallDetails',
    help: 'Details of command calls made',
    labelNames: ['command', 'key', 'data', 'ecc']
});

const numOfCommandErrors = new client.Counter({
    name: 'numOfCommandErrors',
    help: 'Number of command ended in error with error details',
    labelNames: ['command', 'key', 'data', 'ecc']
});

// Histograms track sizes and frequency of events.
const commandResponseTimeHistogram = new client.Histogram({
    name: 'commandResponseTimeHistogram',
    help: 'Command response time in millis histogram',
    labelNames: ['command', 'key', 'data'],
    buckets: [0.1, 5, 15, 50, 100, 500]
});

// Summaries track the trends in events over time (e.g. p99 latency). Summaries calculate percentiles of observed values.
const commandResponseTimeSummary = new client.Summary({
    name: 'commandResponseTimeSummary',
    help: 'Command response time in millis summary',
    labelNames: ['command', 'key']
});

Register.registerMetric(numOfCommandCalls);
Register.registerMetric(commandCallDetails);
Register.registerMetric(numOfCommandErrors);
Register.registerMetric(commandResponseTimeHistogram);
Register.registerMetric(commandResponseTimeSummary);

const end = commandResponseTimeHistogram.startTimer();

const endTimer: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
    end({ command: ecc.command, key, data: 'end time' });
    void Promise.resolve();
};

const countCommandCalls: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
    ecc.startEpoch = Date.now();
    numOfCommandCalls.inc({ command: ecc.command, key, data }, 1);
    commandAllRequestTotal.inc(1);
    commandRequestSize.observe({},1)
    void Promise.resolve();
};

const commandDetails: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
    commandCallDetails.inc(
        {
            command: ecc.command,
            data,
            ecc: `ECCRESULT - ${JSON.stringify(ecc.eccResult)}  ECCMESSAGE ${ecc.messages.join(', ') || 'No messages'}}`
        },
        1
    );
};

const countCommandErrors: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
    if (ecc.error) {
        numOfCommandErrors.inc(
            {
                command: ecc.command,
                key,
                data,
                ecc: `ECCERROR: ${ecc.error}`
            },
            1
        );
        commandAllErrorsTotal.inc(1);
    } else {
        commandAllSuccessTotal.inc(1);
    }

    void Promise.resolve();
};

const observeCommandResponseTime: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
    commandResponseTimeHistogram.observe({ command: ecc.command, key }, 1);
    commandResponseTimeSummary.observe({ command: ecc.command, key }, 1);
    void Promise.resolve();
};

// Combine all command handlers into a single function
const afterCommandParams: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
    const responseTimeInMilliseconds = Date.now() - ecc.startEpoch;
    commandRequestDuration.labels(ecc.command, key, data).observe(responseTimeInMilliseconds)
    endTimer(key, data, ecc);
    commandDetails(key, data, ecc);
    countCommandErrors(key, data, ecc);
    observeCommandResponseTime(key, data, ecc);
};

export { Register, countCommandCalls, afterCommandParams };

// # HELP api_all_request_total The total number of all API requests received
// # TYPE api_all_request_total counter

const commandAllRequestTotal = new client.Counter({
    name: 'command_all_request_total',
    help: 'The total number of all command requests received',
});

// # HELP api_all_success_total The total number of all API requests with success response
// # TYPE api_all_success_total counter

const commandAllSuccessTotal = new client.Counter({
    name: 'command_all_success_total',
    help: 'The total number of all command requests with success response',
});

// # HELP api_all_errors_total The total number of all API requests with error response
// # TYPE api_all_errors_total counter

const commandAllErrorsTotal = new client.Counter({
    name: 'command_all_errors_total',
    help: 'The total number of all command requests with error response',
});

// # HELP api_all_client_error_total The total number of all API requests with client error response
// # TYPE api_all_client_error_total counter
// TODO: add client error codes
const commandAllClientErrorTotal = new client.Counter({
    name: 'command_all_client_error_total',
    help: 'The total number of all command requests with client error response',
});

// # HELP api_all_server_error_total The total number of all API requests with server error response
// # TYPE api_all_server_error_total counter
// TODO: add server error codes
const commandAllServerErrorTotal = new client.Counter({
    name: 'command_all_server_error_total',
    help: 'The total number of all command requests with server error response',
});

// # HELP api_all_request_in_processing_total The total number of all API requests currently in processing (no response yet)
// # TYPE api_all_request_in_processing_total gauge
// TODO: add request in processing
const commandAllRequestInProcessingTotal = new client.Gauge({
    name: 'command_all_request_in_processing_total',
    help: 'The total number of all command requests currently in processing (no response yet)',
});

// # HELP api_request_duration_milliseconds API requests duration
// # TYPE api_request_duration_milliseconds histogram
// Start with request received till response sent
const commandRequestDuration = new client.Histogram({
    name: 'command_request_duration_milliseconds',
    help: 'Command requests duration in milliseconds',
    labelNames: ['command', 'key', 'data'],
    buckets: [0.1, 5, 15, 50, 100, 500, 1000, 5000, 10000, 30000, 60000]
});

// # HELP api_request_size_bytes API requests size
// # TYPE api_request_size_bytes histogram

const commandRequestSize = new client.Histogram({
    name: 'command_request_size_bytes',
    help: 'Command requests size',
    labelNames: ['command', 'key', 'data'],
    buckets: [0.1, 5, 15, 50, 100, 500, 1000, 5000, 10000, 30000, 60000]
});

// # HELP api_response_size_bytes API requests size
// # TYPE api_response_size_bytes histogram

const commandResponseSize = new client.Histogram({
    name: 'command_response_size_bytes',
    help: 'Command response size',
    labelNames: ['command', 'key', 'data'],
    buckets: [0.1, 5, 15, 50, 100, 500, 1000, 5000, 10000, 30000, 60000]
});
