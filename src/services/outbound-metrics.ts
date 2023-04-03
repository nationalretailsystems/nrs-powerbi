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
    numOfCommandCalls.inc({ command: ecc.command, key, data }, 1);
    void Promise.resolve();
};

const commandDetails: ECCHandlerFunction = (
    key: string,
    data: string,
    ecc: ECCCommand,
    converter: ECCRecordConverter,
    routeConfig: any
) => {
    commandCallDetails.inc(
        {
            command: ecc.command,
            data,
            ecc: `ECCRESULT - ${JSON.stringify(ecc.eccResult)}  ECCMESSAGE ${ecc.messages.join(', ') || 'No messages'}}`,
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
    }
    void Promise.resolve();
};

const observeCommandResponseTime: ECCHandlerFunction = (key: string, data: string, ecc: ECCCommand) => {
    commandResponseTimeHistogram.observe({ command: ecc.command, key }, 1);
    commandResponseTimeSummary.observe({ command: ecc.command, key }, 1);
    void Promise.resolve();
};

export { Register, countCommandCalls, commandDetails, countCommandErrors, observeCommandResponseTime, endTimer };
