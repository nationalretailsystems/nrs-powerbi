import createLogger from 'src/services/logger';
import SQLTemplate, { SQLTemplateInput, SQLTemplateOutput } from 'src/models/powerbi-template';
import { JSONObject } from 'src/types';
import transport from 'src/services/connection';

const logger = createLogger('controllers/powerbi');

/**
 * Run the Template SQL query.
 *
 * @param {JSONObject} inputs The minBaldue and maxBaldue to query with
 * @returns {Promise<SQLTemplateOutput}
 */
export async function getViamundoWeight(inputs: JSONObject): Promise<SQLTemplateOutput> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput = {
        fromDate: inputs.fromDate,
        toDate: inputs.toDate
    };
    return transport.execute(SQLTemplate, params) as Promise<SQLTemplateOutput>;
}
