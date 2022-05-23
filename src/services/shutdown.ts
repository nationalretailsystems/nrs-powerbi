import config from 'config';
const defaultTimeout = config?.app?.shutdownTimeout || 6000;
import createLogger from 'src/services/logger';
const logger = createLogger('services/shutdown');

export type Service = { close: Function };
export type WrappedService = { instance: Service; name: string };
const services: WrappedService[] = [];

export function register(name: string, instance: Service) {
    logger.debug('Registering Module', { name });
    // eslint-disable-next-line
    if (typeof instance?.close !== 'function') {
        logger.error('Invalid service registered to shutdown service', { name, instance });
        throw new TypeError(`Service [${name}] must have a close() function`);
    }
    services.push({ name, instance });
}

export async function shutdown(timeout: number = defaultTimeout) {
    setTimeout(killImmediate, timeout);
    logger.warn('Shutting down application', { timeout });

    const closePromises = services.map((service) => {
        logger.debug('Shutting down module', { name: service.name });
        return service.instance
            .close()
            .catch((err: any) => logger.error('Error cleaning up service', { service, err }));
    });
    await Promise.all(closePromises).catch(() => {});

    // Exit process
    process.exit(0);
}

export async function killImmediate() {
    try {
        logger.warn('Timeout exceeded. Killing process.');
    } finally {
        process.kill(process.pid, 'SIGKILL');
    }
}

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());
process.on('SIGHUP', () => shutdown());
