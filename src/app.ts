import config from 'config';

import * as outbound from 'src/outbound';
import * as inbound from 'src/inbound';

export { shutdown, killImmediate } from 'src/services/shutdown';
import { shutdown } from 'src/services/shutdown';
import * as healthCheckService from 'src/services/health-check';
import transport from 'src/services/connection';
import * as ec from '@eradani-inc/eradani-connect';

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

// Health Check for database connection
healthCheckService.register('ibm-i-connection', {
    status: async () => {
        try {
            let result = await transport.execute(new ec.run.Sql(`values(x'60')`));
            if (result?.[0]?.['00001'] === '-') {
                return {
                    status: healthCheckService.Status.ok
                };
            } else {
                return {
                    status: healthCheckService.Status.warn,
                    message: 'Incorrect result returned from db health check query',
                    details: {
                        expected: [{ '00001': '-' }],
                        actual: result
                    }
                };
            }
        } catch (err) {
            return {
                status: healthCheckService.Status.error,
                message: 'Error running connection health check',
                details: {
                    name: err.name,
                    message: err.message
                }
            };
        }
    }
});
