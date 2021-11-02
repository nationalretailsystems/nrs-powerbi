import createLogger from 'src/services/logger';
import SQLTemplate, { SQLTemplateInput, SQLTemplateOutput } from 'src/models/powerbi-template';
import SQLTemplate2, { SQLTemplateInput2, SQLTemplateOutput2 } from 'src/models/powerbi-template2';
import { JSONObject } from 'src/types';
import transport from 'src/services/connection';
import { DateTime } from 'luxon';

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
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        building: inputs.building
    };
    return transport.execute(SQLTemplate, params) as Promise<SQLTemplateOutput>;
};
export async function getCCRevenue(inputs: JSONObject): Promise<SQLTemplateOutput2> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput2 = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        customer1: inputs.customer || '1',
        customer2: inputs.customer || '99999',        
        costcenter: inputs.costcenter
    };
    return transport.execute(SQLTemplate2, params) as Promise<SQLTemplateOutput2>;
}
