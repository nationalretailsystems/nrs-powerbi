/**
 * Logging Utility
 * Provides a standard interface for logging to a daily log file, and also
 * logs to the console. Logs are prefixed with one of NPM's logging levels
 * (Error, Warn, Info, Verbose, Debug, and Silly) along with a context label
 * which you provide, such as "core.services.database", to help you locate the
 * source of the log.
 *
 * There is a setting in the application config file under "logger" called
 * "maxLoggingLevel". You can set this logging level to one of the NPM levels,
 * and this Logger will ignore any logs beyond that level. For example, if you
 * set the maxLoggingLevel to "warn", only "error" and "warn" level logs will
 * be stored. "info", "verbose", "debug", and "silly" log statements will be
 * ignored by the logger.
 *
 * Another setting under the "logger" config is "disableConsole". When set to
 * true, this setting will stop logs from going to the console / QPRINT.
 *
 * Arbitrary additional logging data can be attached to a log record with the
 * second argument to all of the logger methods. This parameter will be
 * serialized by the logger system. To set a depth limit on recursive object
 * serialization, set the config value under "logger" called "maxStringifyDepth"
 * to your desired depth. Default is 10 layers deep.
 *
 * To construct a new logger, add the following code to the top of your TS file:
 * import * as loggerService from 'path/to/logger.ts';
 * const logger = loggerService.createLogger('my.custom.context');
 *
 * Or, if you are using JS, add the following code to the top of your JS file:
 * const logger = require('path/to/logger.js')('my.custom.context');
 *
 * Logs are stored in the 'dist/logs' directory at the root of this application's
 * source code, and are named by their creation dates in the following format:
 * YYYY-MM-DD.log
 *
 * For example, the log file for October 7th, 2020 would be: 2020-10-07.log
 *
 * Happy Logging!
 */

import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fastSafeStringify from 'fast-safe-stringify';
import config from 'config';
import _ from 'lodash/fp';

function _stringify(data: any) {
    try {
        return fastSafeStringify(data, (_key, value) => {
            if (typeof value?.toJSON === 'function') {
                return value.toJSON();
            } else if (value instanceof Error) {
                return _.pick(
                    ['message', 'stack', 'odbcErrors', 'context', 'name', 'fullError', 'additionalData', 'status'],
                    value
                );
            } else {
                return value;
            }
        });
    } catch (e) {
        return '' + data;
    }
}

function _clean(str: string) {
    return str.replace(/[\r\n]/g, '');
}

const formatter = winston.format.combine(
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label', 'context'] }),
    winston.format.printf((options: any) => {
        let loggerName = options.metadata.loggerName;
        delete options.metadata.loggerName;
        let logString =
            '' +
            `[${options.level.toUpperCase()}]`.padEnd(10, ' ') +
            `(${new Date().toISOString()})` +
            _clean(` -- ${loggerName} -- ${options.message} -- ${_stringify(options.metadata)}`);
        return logString;
    })
);

const normalTransport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '../../logs/', '%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    json: true,
    level: config.logger.maxLoggingLevel,
    format: formatter
});

// Only handles uncaught exceptions in the program
const exceptionTransport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '../../logs/exceptions/', '%DATE%.exceptions'),
    datePattern: 'YYYY-MM-DD',
    handleExceptions: true,
    json: true,
    level: config.logger.maxLoggingLevel,
    format: formatter
});

const consoleTransport = new winston.transports.Console({
    level: config.logger.maxLoggingLevel,
    format: formatter
});

const logger = winston.createLogger({
    transports: [normalTransport, consoleTransport],
    exceptionHandlers: [normalTransport, consoleTransport, exceptionTransport],
    exitOnError: false
});

// Don't output to the console if we're in testing mode
if (config.logger.disableConsole) {
    logger.remove(consoleTransport);
}

export default function createLogger(loggerName: string) {
    // Set the default context of the child
    return logger.child({ loggerName });
}

// Logger for Morgan
// Attach with: app.use(require("morgan")("combined", { stream: requestLogger }));
const _requestLogger = createLogger('api-requests');
export const requestLogger = {
    write: function (message: string) {
        _requestLogger.info(message);
    }
};
