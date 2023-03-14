import promClient from 'prom-client';
import createLogger from 'src/services/logger';
import promBundle from 'express-prom-bundle';

const logger = createLogger('services/inbound-metrics');

/**
 * This funtion will start the collection of metrics and should be called from within in the main js file
 */
function startCollection() {
    logger.debug(`Starting the collection of metrics, the metrics are available on /metrics`);
    require('prom-client').collectDefaultMetrics();
}

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
export { metricsMiddleware, startCollection };
