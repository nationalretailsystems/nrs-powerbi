import createLogger from 'src/services/logger';
import SQLTemplate, { SQLTemplateInput, SQLTemplateOutput } from 'src/models/powerbi-template';
import SQLTemplate2, { SQLTemplateInput2, SQLTemplateOutput2 } from 'src/models/powerbi-template2';
import SQLTemplate3, { SQLTemplateInput3, SQLTemplateOutput3 } from 'src/models/powerbi-template3';
import SQLTemplate4, { SQLTemplateInput4, SQLTemplateOutput4 } from 'src/models/powerbi-template4';
import SQLTemplate5, { SQLTemplateInput5, SQLTemplateOutput5 } from 'src/models/powerbi-template5';
import SQLTemplate6, { SQLTemplateInput6, SQLTemplateOutput6 } from 'src/models/powerbi-template6';
import SQLTemplateBLHD2AR, { SQLTemplateInputBLHD2AR, SQLTemplateOutputBLHD2AR } from 'src/models/powerbi-blhd2ar';
import SQLTemplateBLHD2ARKY, { SQLTemplateInputBLHD2ARKY, SQLTemplateOutputBLHD2ARKY } from 'src/models/powerbi-blhd2arky';
import SQLTemplateRECPT, { SQLTemplateInputRECPT, SQLTemplateOutputRECPT } from 'src/models/powerbi-recpt';
import SQLTemplateMANIF, { SQLTemplateInputMANIF, SQLTemplateOutputMANIF } from 'src/models/powerbi-manif';
import SQLTemplateBLEX, {  SQLTemplateOutputBLEX } from 'src/models/powerbi-blex';
import SQLTemplateBLPR, {  SQLTemplateOutputBLPR } from 'src/models/powerbi-blpr';
import SQLTemplateBLSJ, {  SQLTemplateOutputBLSJ } from 'src/models/powerbi-blsj';
import SQLTemplateARBAL, {  SQLTemplateOutputARBAL } from 'src/models/powerbi-arbalance';
import SQLTemplatePRODTL, { SQLTemplateInputPRODTL, SQLTemplateOutputPRODTL } from 'src/models/powerbi-prodetails';
import SQLTemplateBILLDTL, { SQLTemplateInputBILLDTL, SQLTemplateOutputBILLDTL } from 'src/models/powerbi-billingdetail';
import SQLTemplateBLHDACT, { SQLTemplateInputBLHDACT, SQLTemplateOutputBLHDACT } from 'src/models/powerbi-blhdact';
import SQLTemplateBLHDCONS, {  SQLTemplateOutputBLHDCONS } from 'src/models/powerbi-blhdcons';
import SQLTemplateBLHDOL5, { SQLTemplateInputBLHDOL5, SQLTemplateOutputBLHDOL5 } from 'src/models/powerbi-blhdolfile5';
import SQLTemplateBLHDORIGH, { SQLTemplateInputBLHDORIGH, SQLTemplateOutputBLHDORIGH } from 'src/models/powerbi-blhdoriginh';
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
export async function getSales(inputs: JSONObject): Promise<SQLTemplateOutput6> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput6 = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return transport.execute(SQLTemplate6, params) as Promise<SQLTemplateOutput6>;
}
export async function getBlhd2Ar(inputs: JSONObject): Promise<SQLTemplateOutputBLHD2AR> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHD2AR = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
    };
    return transport.execute(SQLTemplateBLHD2AR, params) as Promise<SQLTemplateOutputBLHD2AR>;
}
export async function getBlhd2ArKy(inputs: JSONObject): Promise<SQLTemplateOutputBLHD2ARKY> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHD2ARKY = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
    };
    return transport.execute(SQLTemplateBLHD2ARKY, params) as Promise<SQLTemplateOutputBLHD2ARKY>;
}
export async function getRecpt(inputs: JSONObject): Promise<SQLTemplateOutputRECPT> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputRECPT = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
    };
    return transport.execute(SQLTemplateRECPT, params) as Promise<SQLTemplateOutputRECPT>;
}
export async function getManif(inputs: JSONObject): Promise<SQLTemplateOutputMANIF> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputMANIF = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
    };
    return transport.execute(SQLTemplateMANIF, params) as Promise<SQLTemplateOutputMANIF>;
}
export async function getBlex(): Promise<SQLTemplateOutputBLEX> {
    logger.debug('Calling SQLTemplate program');
    return transport.execute(SQLTemplateBLEX) as Promise<SQLTemplateOutputBLEX>;
}
export async function getBlpr(): Promise<SQLTemplateOutputBLPR> {
    logger.debug('Calling SQLTemplate program');
    return transport.execute(SQLTemplateBLPR) as Promise<SQLTemplateOutputBLPR>;
}
export async function getBlsj(): Promise<SQLTemplateOutputBLSJ> {
    logger.debug('Calling SQLTemplate program');
    return transport.execute(SQLTemplateBLSJ) as Promise<SQLTemplateOutputBLSJ>;
}
export async function getARBalance(): Promise<SQLTemplateOutputARBAL> {
    logger.debug('Calling SQLTemplate program');
    return transport.execute(SQLTemplateARBAL) as Promise<SQLTemplateOutputARBAL>;
}
export async function getProDetails(inputs: JSONObject): Promise<SQLTemplateOutputPRODTL> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputPRODTL = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return transport.execute(SQLTemplatePRODTL, params) as Promise<SQLTemplateOutputPRODTL>;
}
export async function getBillDetail(inputs: JSONObject): Promise<SQLTemplateOutputBILLDTL> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBILLDTL = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()               
    };
    return transport.execute(SQLTemplateBILLDTL, params) as Promise<SQLTemplateOutputBILLDTL>;
}
export async function getBlhdAct(inputs: JSONObject): Promise<SQLTemplateOutputBLHDACT> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHDACT = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
    };
    return transport.execute(SQLTemplateBLHDACT, params) as Promise<SQLTemplateOutputBLHDACT>;
}
export async function getBlhdCons(): Promise<SQLTemplateOutputBLHDCONS> {
    logger.debug('Calling SQLTemplate program');
    return transport.execute(SQLTemplateBLHDCONS) as Promise<SQLTemplateOutputBLHDCONS>;
}
export async function getBlhdOlfile5(inputs: JSONObject): Promise<SQLTemplateOutputBLHDOL5> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHDOL5 = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return transport.execute(SQLTemplateBLHDOL5, params) as Promise<SQLTemplateOutputBLHDOL5>;
}
export async function getBlhdOriginh(inputs: JSONObject): Promise<SQLTemplateOutputBLHDORIGH> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHDORIGH = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
    };
    return transport.execute(SQLTemplateBLHDORIGH, params) as Promise<SQLTemplateOutputBLHDORIGH>;
}
