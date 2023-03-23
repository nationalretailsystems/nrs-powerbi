import * as client from 'prom-client';
import { register as Register } from 'prom-client';
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

const numOfCommandCalls = new client.Counter({
    name: 'numOfCommandCalls',
    help: 'Number of command calls made',
    labelNames: ['command']
});

const numOfCommandErrors = new client.Counter({
    name: 'numOfCommandErrors',
    help: 'Number of command errors made',
    labelNames: ['command']
});

const commandResponseTime = new client.Summary({
    name: 'commandResponseTime',
    help: 'Command response time in millis',
    labelNames: ['command', 'status']
});

const commandResponseTimeHistogram = new client.Histogram({
    name: 'commandResponseTimeHistogram',
    help: 'Command response time in millis',
    labelNames: ['command', 'status']
});

const commandResponseTimeGauge = new client.Gauge({
    name: 'commandResponseTimeGauge',
    help: 'Command response time in millis',
    labelNames: ['command', 'status']
});

const commandResponseTimeSummary = new client.Summary({
    name: 'commandResponseTimeSummary',
    help: 'Command response time in millis',
    labelNames: ['command', 'status']
});

Register.registerMetric(numOfCommandCalls);
Register.registerMetric(numOfCommandErrors);
Register.registerMetric(commandResponseTime);
Register.registerMetric(commandResponseTimeHistogram);
Register.registerMetric(commandResponseTimeGauge);
Register.registerMetric(commandResponseTimeSummary);

Register.setDefaultLabels({
    app: 'outbound'
});

const countCommandCalls: ECCHandlerFunction = (key: string, data: string, ecc) => {
    numOfCommandCalls.inc({ command: data }, 1);
};

const countCommandErrors = (key: string, data: string) => {
    numOfCommandErrors.inc({ command: data }, 1);
};

const observeCommandResponseTime = (command: string, status: string, time: number) => {
    commandResponseTime.observe({ command, status }, time);
    commandResponseTimeHistogram.observe({ command, status }, time);

    // Gauge is a special case of a histogram, where the value is always the last value
    // that was set. This is useful for things like the current temperature, or the
    // current number of jobs in a queue.
    commandResponseTimeGauge.set({ command, status }, time);

    // Summary is a special case of a histogram, where the value is always the last value
    // that was set. This is useful for things like the current temperature, or the
    // current number of jobs in a queue.
    commandResponseTimeSummary.observe({ command, status }, time);
};

export { Register, countCommandCalls, countCommandErrors, observeCommandResponseTime };
