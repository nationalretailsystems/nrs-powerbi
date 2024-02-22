import { Odbc } from '@eradani-inc/eradani-connect/transports';
import { Response } from 'express';
import _ from 'lodash';
import odbc from 'odbc';
import createLogger from 'src/services/logger';
const logger = createLogger('services/cursor');

const defaultCursorOptions: SendCursorOptions = {
    fetchSize: 1000,
    autoEnd: true,
    cursor: true
};
export interface SendCursorOptions {
    fetchSize: number;
    autoEnd: boolean;
    cursor: true;
}
/**
 * Sends the result of a cursor query over an Eradani Connect transport to the specified API response.
 * @param {Odbc} transport The Eradani Connect transport instance.
 * @param {string} query The SQL query to execute.
 * @param {any[]} params The parameters to bind to the query.
 * @param {Response} res The Express response object.
 * @param {Partial<SendCursorOptions>} [options={}] Optional cursor configuration options.
 * @param {number} [options.fetchSize=1000] The number of rows to fetch per iteration.
 * @param {boolean} [options.autoEnd=true] Determines whether to automatically end the response when done.
 * @returns {Promise<void>} A Promise that resolves when the result has been sent.
 */
export async function sendCursorResult(
    transport: Odbc,
    query: string,
    params: any[],
    res: Response,
    options: Partial<SendCursorOptions> = {}
) {
    try {
        logger.debug('Sending cursor result');
        const cursorOptions: SendCursorOptions = Object.assign({}, defaultCursorOptions, options);
        const connection: odbc.Connection = await transport.connect();
        const cursor = await connection.query(query, params, _.omit(cursorOptions, ['autoEnd']));
        res.status(200).type('application/json').write('[');
        let firstChunk = true;
        while (!cursor.noData) {
            logger.debug('Fetching cursor chunk');
            const chunk = await cursor.fetch();

            logger.debug('Formatting cursor chunk');
            let chunkToWrite: string = '';
            if (chunk?.length) {
                if (!firstChunk) {
                    chunkToWrite += ',';
                } else {
                    firstChunk = false;
                }
                for (let i = 0; i < chunk.length; i++) {
                    chunkToWrite += JSON.stringify(chunk[i], (_, v) => (typeof v === 'string' ? v.trim() : v));
                    chunkToWrite += i < chunk.length - 1 ? ',' : '';
                }
                logger.debug('Sending cursor chunk');
                res.write(chunkToWrite);
            }
        }
        await cursor.close();
        res.write(']');
        if (cursorOptions.autoEnd) {
            logger.debug('Ending response');
            res.end();
        }
    } catch (e) {
        logger.error('Failed to send cursor result', { e });
        throw e;
    }
}
