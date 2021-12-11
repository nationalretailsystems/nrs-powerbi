import config from 'config';
const defaultTimeout = config?.app?.healthCheckTimeout || 3000;
import createLogger from 'src/services/logger';
const logger = createLogger('services/health-check');

export enum Status {
    ok = 'ok',
    warn = 'warn',
    error = 'error',
    unreachable = 'unreachable'
}

export interface StatusReport {
    status: Status;
    message?: string;
    details?: any;
}

export type Service = { status: () => StatusReport | Promise<StatusReport> };
export type WrappedService = { instance: Service; name: string };
const services: WrappedService[] = [];

export function register(name: string, instance: Service) {
    // eslint-disable-next-line
    if (typeof instance?.status !== 'function') {
        logger.error('Invalid service registered to health check service', { name, instance });
        throw new TypeError(`Service [${name}] must have a status() function`);
    }
    services.push({ name, instance });
}

export async function getStatus(timeout: number = defaultTimeout) {
    logger.verbose('Checking app health', { timeout });

    let results: Record<string, StatusReport> = {};
    for (let service of services) {
        try {
            results[service.name] = await getServiceStatus(service, timeout);
        } catch (err) {
            try {
                logger.error('Error checking service status', { service, err });
                results[service.name] = serviceUnreachable(service, timeout);
            } catch {}
        }
    }

    const fullReport = {
        status: _getOverallStatus(results),
        timestamp: Date.now(),
        uptime: process.uptime(),
        services: results
    };

    logger.verbose('Health check completed', fullReport);
    return fullReport;
}

export function getServiceStatus(service: WrappedService, timeout: number): Promise<StatusReport> {
    return new Promise(async (resolve) => {
        let timer = setTimeout(() => resolve(serviceUnreachable(service, timeout)), timeout);
        let result = await service.instance.status();
        clearTimeout(timer);
        resolve(result);
    });
}

export function serviceUnreachable(service: WrappedService, timeout: number): StatusReport {
    return {
        status: Status.unreachable,
        message: `No response from service [${service.name}]`,
        details: {
            timeout
        }
    };
}

function _getOverallStatus(reports: Record<string, StatusReport>) {
    let overallStatus = Status.ok;
    for (let serviceName in reports) {
        let report = reports[serviceName];
        if (report.status === Status.warn && overallStatus === Status.ok) {
            overallStatus = Status.warn;
        } else if ([Status.unreachable, Status.error].includes(report.status)) {
            overallStatus = Status.error;
        }
    }
    return overallStatus;
}
