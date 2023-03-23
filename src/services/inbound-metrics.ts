import promClient from 'prom-client';
import createLogger from 'src/services/logger';
import promBundle from 'express-prom-bundle';

const logger = createLogger('services/inbound-metrics');

const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    customLabels: { app: 'ec-inbound' },
    promClient: {
        collectDefaultMetrics: {}
    }
});

// Add the middleware to express
export { metricsMiddleware };
