import config from 'config';

import * as outbound from 'src/outbound';
import * as inbound from 'src/inbound';

export { shutdown, killImmediate } from 'src/services/shutdown';

import createLogger from 'src/services/logger';
const logger = createLogger('app');

const modules = [];
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
        logger.error('App Startup Failed', err);
        setTimeout(() => process.kill(process.pid, 'SIGKILL'), 3000);
        process.exit(0);
    });

process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection Received', err);
});
