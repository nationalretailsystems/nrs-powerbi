import * as client from 'prom-client';

import ECCRouter from '@eradani-inc/ecc-router';
import { ECClient } from '@eradani-inc/ec-client';

import config from 'config';
import createLogger from 'src/services/logger';
const { ecclient, debug } = config;
import registerCommands from 'src/commands';
import * as prometheus from 'src/services/outbound-metrics';
import * as shutdownService from 'src/services/shutdown';

const logger = createLogger('outbound');
const requestLogger = createLogger('requests');
let router: ECCRouter;

export async function start() {
    shutdownService.register('outbound', { close: () => stop() });

    const ecc = new ECClient(ecclient);
    router = new ECCRouter(ecc, { logger: requestLogger, debug });

    await registerCommands(router);

    await router.listen();

    logger.info('ECC App Listening for Commands');
}

export async function stop() {
    return router.close();
}
