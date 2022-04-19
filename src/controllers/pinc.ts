import createLogger from 'src/services/logger';
import SQLTemplate, { SQLTemplateInput7, SQLTemplateOutput } from 'src/models/pinc';
import { JSONObject } from 'src/types';
import   transport  from 'src/services/connection';

const logger = createLogger('controllers/pinc');

/**
 * Run the Template SQL query.
 *
 * @param {JSONObject} inputs The minBaldue and maxBaldue to query with
 * @returns {Promise<SQLTemplateOutput}
 */
export async function getPinc(inputs: JSONObject): Promise<SQLTemplateOutput> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput7 = {
        fromYard: inputs.fromYard
        };
    return transport.execute(SQLTemplate, params) as Promise<SQLTemplateOutput>;
}
