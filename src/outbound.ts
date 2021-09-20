import ECCRouter from '@eradani-inc/ecc-router';
import { ECClient } from '@eradani-inc/ec-client';

import config from 'config';
import createLogger from 'src/services/logger';
const { ecclient, debug, ec } = config;
import registerCommands from 'src/commands';

const logger = createLogger('app');
const requestLogger = createLogger('commands');
let router: ECCRouter;
import * as shutdownService from 'src/services/shutdown';
import * as healthCheckService from 'src/services/health-check';
let active = false;

export async function start() {
    const ecc = new ECClient({ connectionString: ec.odbc, ...ecclient });
    router = new ECCRouter(ecc, { logger: requestLogger, debug });
    shutdownService.register('ec-client', router);

    await registerCommands(router);

    await router.listen();

    logger.info('ECC App Listening for Commands');
    active = true;
}

export async function stop() {
    active = false;
    return router.close();
}

healthCheckService.register('ec-client', {
    status: () => ({ status: active ? healthCheckService.Status.ok : healthCheckService.Status.unreachable })
});
