import http from 'http';
import express from 'express';
import createLogger, { requestLogger } from 'src/services/logger';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import routes from 'src/routes';
import expressOASGenerator, { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import swStats from 'swagger-stats';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import path from 'path';
// If you want realtime services: import socketIO from 'socket.io';
const logger = createLogger('app');
const requestLoggerInst = createLogger('requests');
import config from 'config';
const generateSwagger = config?.swagger?.generate || process.env.GENERATE_SWAGGER === 'true';
import ECCRouter from '@eradani-inc/ecc-router';
import { ECClient } from '@eradani-inc/ec-client';
const { ecclient, debug } = config;
import registerCommands from 'src/commands';
let router: ECCRouter;

// TODO SEPARATE INBOUND AND OUTBOUND STARTUP LIKE AARON'S V3 EXAMPLE

const startup = loadSwagger()
    .then(setUpAPI)
    .then(startServer)
    .catch((err: any) => {
        logger.error('ERROR ON INBOUND STARTUP', err);
        console.log('ERROR ON INBOUND STARTUP: ', err);
    })
    .then(startOutbound)
    .catch((err: any) => {
        logger.error('ERROR ON OUTBOUND STARTUP', err);
        console.log('ERROR ON OUTBOUND STARTUP: ', err);
    });

async function loadSwagger() {
    try {
        if (config?.swagger?.disableDashboard) {
            return undefined;
        }
        return {
            v2: JSON.parse((await readFile(path.join(__dirname, '../../oas/spec.json'))).toString()),
            v3: JSON.parse((await readFile(path.join(__dirname, '../../oas/spec_v3.json'))).toString())
        };
    } catch (e) {
        logger.warn('Failed to load swagger spec. Disabling swagger-dependent dashboards.', e);
        return undefined;
    }
}

function startServer(app: Express.Application) {
    const server = http.createServer(app);

    server.on('error', function (err: any) {
        // If the address is already in use
        if (err.code === 'EADDRINUSE') {
            logger.error(
                '\n\n========================================\n' +
                    '\n' +
                    'ERROR: Address In Use (EADDRINUSE)!\n' +
                    '\n' +
                    'The server could not start because its\n' +
                    `configured port (Port ${process.env.PORT || config.app.port}) is already\n` +
                    'in use by another application. This is\n' +
                    'usually caused by an attempt to start a\n' +
                    'second instance of this server while\n' +
                    'another instance is running.\n' +
                    '\n' +
                    "Check to make sure there isn't already\n" +
                    'another instance of this application\n' +
                    'running and try again.\n' +
                    '\n' +
                    '=======================================\n\n'
            );
            process.exit(0);
        } else {
            throw err;
        }
    });

    server.listen(process.env.PORT || config.app.port);
    logger.info(`Server listening on port ${process.env.PORT || config.app.port}`);

    return { server };
}

async function startOutbound() {
    const ecc = new ECClient(ecclient);
    router = new ECCRouter(ecc, { logger: requestLoggerInst, debug });

    await registerCommands(router);

    await router.listen();

    logger.info('ECC App Listening for Commands');
}

async function stop() {
    return router.close();
}

function setUpAPI(swaggerSpec?: any) {
    const app = express();

    // General middlewares

    if (generateSwagger) {
        expressOASGenerator.handleResponses(app, {
            specOutputPath: './oas/spec.json',
            alwaysServeDocs: false,
            specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
            swaggerDocumentOptions: {}
        });
    }

    app.use(morgan('dev', { stream: requestLogger }));
    app.use(cors());

    if (swaggerSpec && !config?.swagger?.disableDashboard) {
        app.use(swStats.getMiddleware({ swaggerSpec: swaggerSpec.v3, uriPath: '/dashboard/stats' }));
        app.use('/dashboard/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.v3));
        app.use('/api-spec/v2', (_, res) => res.status(200).json(swaggerSpec.v2));
        app.use('/api-spec/v3', (_, res) => res.status(200).json(swaggerSpec.v3));
    }

    app.use(
        bodyParser.json({
            type: 'application/json'
        })
    );
    app.use(
        bodyParser.urlencoded({
            extended: false
        })
    );

    // Mount routes
    const router = express.Router();
    routes(router);
    app.use('/', router);

    if (generateSwagger) {
        expressOASGenerator.handleRequests();
    }

    return app;
}

module.exports = {
    startup: startup,
    stop
};
