import config from 'config';
const defaultTimeout = config?.app?.shutdownTimeout || 3000;
import createLogger from 'src/services/logger';
const logger = createLogger('services/shutdown');

export async function shutdown(timeout: number = defaultTimeout) {
    setTimeout(killImmediate, timeout);
    logger.warn('Shutting down application', { timeout });

    // Custom shutdown steps

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
