import createLogger from 'src/services/logger';
import swStats from 'swagger-stats';

let promClient = swStats.getPromClient();

let Register = new promClient.Registry();

Register.setDefaultLabels({
    prefix: 'ec_inbound_'
});

swStats.getPromClient().collectDefaultMetrics({
    prefix: 'ec_inbound_default_',
    register: Register
});

// Add the middleware to express
export { swStats };
