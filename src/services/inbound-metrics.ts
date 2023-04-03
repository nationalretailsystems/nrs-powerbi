import createLogger from 'src/services/logger';
import promBundle from 'express-prom-bundle';

const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    customLabels: { app: 'ec-inbound' },
    promClient: {
        collectDefaultMetrics: { labels: { app: 'ec-inbound' } }
    }
});

// Add the middleware to express
export { metricsMiddleware };
