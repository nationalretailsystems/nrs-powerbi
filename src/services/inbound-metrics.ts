import swStats from 'swagger-stats';
import * as uuid from 'uuid';

swStats.getPromClient().register.setDefaultLabels({
    app: 'eradani-connect',
    type: 'inbound',
    uuid: uuid.v4()
});

// Add the middleware to express
export { swStats };
