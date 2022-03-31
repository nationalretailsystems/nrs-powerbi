import createLogger from 'src/services/logger';
import SQLTemplate, { SQLTemplateInput, SQLTemplateOutput } from 'src/models/powerbi-template';
import SQLTemplate2, { SQLTemplateInput2, SQLTemplateOutput2 } from 'src/models/powerbi-template2';
import SQLTemplate3, { SQLTemplateInput3, SQLTemplateOutput3 } from 'src/models/powerbi-template3';
import SQLTemplate4, { SQLTemplateInput4, SQLTemplateOutput4 } from 'src/models/powerbi-template4';
import SQLTemplate5, { SQLTemplateInput5, SQLTemplateOutput5 } from 'src/models/powerbi-template5';
import { JSONObject } from 'src/types';
import transport, { transport2 } from 'src/services/connection';
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
}
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
export async function getHours(inputs: JSONObject): Promise<SQLTemplateOutput3> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput3 = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        costCenter1: inputs.costCenter || '000',
        costCenter2: inputs.costCenter || '999'
    };
    return transport.execute(SQLTemplate3, params) as Promise<SQLTemplateOutput3>;
}
export async function getGL(inputs: JSONObject): Promise<SQLTemplateOutput4> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput4 = {
        year: inputs.year,
        month: inputs.month
    };
    return transport2.execute(SQLTemplate4, params) as Promise<SQLTemplateOutput4>;
}
export async function getWMS378(inputs: JSONObject): Promise<SQLTemplateOutput5> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput5 = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return transport.execute(SQLTemplate5, params) as Promise<SQLTemplateOutput5>;
}
