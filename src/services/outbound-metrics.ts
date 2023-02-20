import { Register } from 'src/services/inbound-metrics';
import * as client from 'prom-client';

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

Register.registerMetric(numOfCommandCalls);
Register.registerMetric(numOfCommandErrors);
Register.registerMetric(commandResponseTime);

Register.setDefaultLabels({
    app: 'outbound'
});

export { numOfCommandCalls, numOfCommandErrors, commandResponseTime };
