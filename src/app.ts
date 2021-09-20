import config from 'config';

import * as outbound from 'src/outbound';
import * as inbound from 'src/inbound';

export { shutdown, killImmediate } from 'src/services/shutdown';
import { shutdown } from 'src/services/shutdown';

import createLogger from 'src/services/logger';
const logger = createLogger('app');

const modules: any[] = [];
if (config.app.inbound) {
    modules.push(inbound.start());
}

if (config.app.outbound) {
    modules.push(outbound.start());
}

export const startup = Promise.all(modules)
    .then(() => {
        logger.info('App Startup Complete!');
    })
    .catch((err) => {
        void shutdown();
        logger.error('App Startup Failed', err);
    });

process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection Received', err);
});
