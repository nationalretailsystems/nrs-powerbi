import http from 'http';
import express from 'express';
import config from 'config';
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
import * as user from 'src/controllers/user';
import * as shutdownService from 'src/services/shutdown';
import getMetricsFromClusters, { metricsDataString } from 'src/services/prom-client-pm2-cluster';
import isPm2Running from 'src/services/pm2';

// If you want realtime services: import socketIO from 'socket.io';
const logger = createLogger('inbound');
const generateSwagger = config?.swagger?.generate || process.env.GENERATE_SWAGGER === 'true';
let _server: http.Server;
let metrics = config?.metrics;

export const start = () => {
    shutdownService.register('inbound', { close: () => stop() });
    return loadSwagger()
        .then(setUpAPI)
        .then(startServer)
        .catch((err: any) => {
            logger.error('ERROR ON STARTUP', err);
        })
        .catch((err: any) => {
            console.log('ERROR ON STARTUP: ', err);
        });
};

export const stop = (): Promise<Error | null> => {
    return new Promise((resolve, reject) => {
        if (!_server || !_server.listening) {
            return reject(new Error('Server is not running'));
        }

        _server.close((err) => {
            if (err) {
                return reject(err);
            }
            logger.debug('HTTP Server Closed');
            resolve(null);
        });
    });
};

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

    server.listen(config.app.port, config.app.host);
    logger.info(`Server listening on port ${config.app.port}`);

    _server = server;
    return { server };
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
        app.use(
            swStats.getMiddleware({
                swaggerSpec: swaggerSpec.v3,
                uriPath: '/dashboard/stats',
                authentication: config.swagger.auth.enabled,
                sessionMaxAge: config.swagger.auth.sessionMaxAge,
                onAuthenticate: user.dashboardLoginCredentialsCheck
            })
        );
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

    app.get('/metrics', async (req, res) => {
        try {
            res.set('Content-type', swStats.getPromClient().register.contentType);
            // If PM2 is not running, return local metrics

            if (await isPm2Running()) {
                res.write(await getMetricsFromClusters(req, res));
            } else {
                res.write(await metricsDataString());
            }
            res.end();
        } catch (e) {
            console.log(e);
        }
    });

    // Mount routes
    const router = express.Router();
    routes(router);
    app.use('/', router);

    if (generateSwagger) {
        expressOASGenerator.handleRequests();
    }

    return app;
}
