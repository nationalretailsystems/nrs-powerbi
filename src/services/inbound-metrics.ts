/**
 * Newly added requires
 */

import { register as Register, Counter, Histogram, Summary } from 'prom-client';
import ResponseTime from 'response-time';
import createLogger from 'src/services/logger';
import http from 'http';
const logger = createLogger('services/prometheus');

export const numOfRequests = new Counter({
    name: 'numOfRequests',
    help: 'Number of requests made',
    labelNames: ['method']
});

export const pathsTaken = new Counter({
    name: 'pathsTaken',
    help: 'Paths taken in the app',
    labelNames: ['path']
});

export const responses = new Summary({
    name: 'responses',
    help: 'Response time in millis',
    labelNames: ['method', 'path', 'status']
});

/**
 * This funtion will start the collection of metrics and should be called from within in the main js file
 */
export function startCollection() {
    logger.debug(`Starting the collection of metrics, the metrics are available on /metrics`);
    require('prom-client').collectDefaultMetrics();
}

/**
 * This function increments the counters that are executed on the request side of an invocation
 * Currently it increments the counters for numOfPaths and pathsTaken
 */
export function requestCounters(req: { path: string; method: any }, res: any, next: () => void) {
    if (req.path !== '/metrics') {
        numOfRequests.inc({ method: req.method });
        pathsTaken.inc({ path: req.path });
    }
    next();
}

/**
 * This function increments the counters that are executed on the response side of an invocation
 * Currently it updates the responses summary
 */
export const responseCounters = ResponseTime(function (
    req: http.IncomingMessage | any,
    res: http.ServerResponse | any,
    time
) {
    if (req.url !== '/metrics') {
        responses.labels(req.method, req.url, res.statusCode).observe(time);
    }
});

/**
 * In order to have Prometheus get the data from this app a specific URL is registered
 */
export function injectMetricsRoute(App: { get: (arg0: string, arg1: (req: any, res: any) => void) => void }) {
    App.get('/metrics', async (req, res) => {
        res.set('Content-Type', Register.contentType);
        res.end(await Register.metrics());
    });
}

export const httpRequestTimer = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
});

// Register the histogram
Register.registerMetric(httpRequestTimer);

// Export the Register so that it can be used in the routes
export { Register };
