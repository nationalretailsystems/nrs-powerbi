import createLogger from 'src/services/logger';

import SQLTemplateHEARTBEATS, {
    SQLTemplateInputGETHEARTBEATS,
    SQLTemplateOutputGETHEARTBEATS
} from 'src/models/platsci-getheartbeats';
import SQLTemplateGETONEHB, {
    SQLTemplateInputGETONEHB,
    SQLTemplateOutputGETONEHB
} from 'src/models/platsci-getonehb';
import SQLTemplateGETLATESTHB, { SQLTemplateOutputGETLATESTHB } from 'src/models/platsci-getlatesthb';
import SQLTemplateDRIVPERF, {
    SQLTemplateInputDRIVPERF,
    SQLTemplateOutputDRIVPERF
} from 'src/models/platsci-psdrivperf';
import SQLTemplateSKYBITZ, { SQLTemplateInputSKYBITZ, SQLTemplateOutputSKYBITZ } from 'src/models/platsci-skybitz';
import SQLTemplateGETDVIR, { SQLTemplateInputGETDVIR, SQLTemplateOutputGETDVIR } from 'src/models/platsci-psdvir';
import SQLTemplateGETHOSMSGS, {
    SQLTemplateInputGETHOSMSGS,
    SQLTemplateOutputGETHOSMSGS
} from 'src/models/platsci-psgethos';
import { JSONObject } from 'src/types';
import { powerbiTransports, transport as eradaniTransport } from 'src/services/connection';
import { DateTime } from 'luxon';
import odbc from 'odbc';
import { sendCursorResult } from 'src/services/cursor';
// X import { transport } from 'winston';
/* eslint-disable capitalized-comments */
/*
 import { WatchDirectoryFlags, createUnparsedSourceFile } from 'typescript';
 import { transport } from 'winston';
 import odbc from 'odbc';
*/
// import { promises as fs } from 'fs';
// import APIError from 'src/APIError';
/* eslint-enable capitalized-comments */

const logger = createLogger('controllers/platsci');

export async function getHeartBeats(inputs: JSONObject): Promise<SQLTemplateOutputGETHEARTBEATS> {
    logger.debug('Calling SQLTemplate program-getHeartBeats');
    let secondUnit;
    let finaltype;
    const params: SQLTemplateInputGETHEARTBEATS = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        unit: inputs.unit,
        unit2: inputs.unit2,
        type: inputs.type,
        type2: inputs.type2
    };
    if (inputs.unit === '000000') {
        secondUnit = '999999';
    } else {
        secondUnit = inputs.unit;
    }
    params.unit2 = secondUnit;
    params.type2 = params.type;
    logger.debug('platsci.ts-' + params.toDate + ' ' + params.fromDate + ' ' + params.unit);
    return powerbiTransports.wolf.execute(SQLTemplateHEARTBEATS, params) as Promise<SQLTemplateOutputGETHEARTBEATS>;
}
export async function getOneHB(inputs: JSONObject): Promise<SQLTemplateOutputGETONEHB> {
    logger.debug('Calling SQLTemplate program-getOneHB');
    const params: SQLTemplateInputGETONEHB = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    }
     logger.debug('platsci.ts-' + params.toDate + ' ' + params.fromDate );
    return powerbiTransports.wolf.execute(SQLTemplateGETONEHB, params) as Promise<SQLTemplateOutputGETONEHB>;
}
export async function getLatestHB(): Promise<SQLTemplateOutputGETLATESTHB> {
    logger.debug('Calling SQLTemplate program-getLatestHB');
    return powerbiTransports.wolf.execute(SQLTemplateGETLATESTHB) as Promise<SQLTemplateOutputGETLATESTHB>;
}
export async function getDrivperf(inputs: JSONObject): Promise<SQLTemplateOutputDRIVPERF> {
    logger.debug('Calling SQLTemplate program-getDrivperf');
    const params: SQLTemplateInputDRIVPERF = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateDRIVPERF, params) as Promise<SQLTemplateOutputDRIVPERF>;
}
export async function getSkybitz(inputs: JSONObject): Promise<SQLTemplateOutputSKYBITZ> {
    logger.debug('Calling SQLTemplate program-getSkybitz');
    const params: SQLTemplateInputSKYBITZ = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateSKYBITZ, params) as Promise<SQLTemplateOutputSKYBITZ>;
}
export async function getDvir(inputs: JSONObject): Promise<SQLTemplateOutputGETDVIR> {
    logger.debug('Calling SQLTemplate program-getDvir');
    const params: SQLTemplateInputGETDVIR = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateGETDVIR, params) as Promise<SQLTemplateOutputGETDVIR>;
}
export async function getHosMsgs(inputs: JSONObject): Promise<SQLTemplateOutputGETHOSMSGS> {
    logger.debug('Calling SQLTemplate program-getHosMsgs');
    const params: SQLTemplateInputGETHOSMSGS = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        logType: inputs.logType
    };
    return powerbiTransports.wolf.execute(SQLTemplateGETHOSMSGS, params) as Promise<SQLTemplateOutputGETHOSMSGS>;
}
export async function getHosMsgs2(inputs: JSONObject) {
    logger.debug('Calling SQLTemplate program-getHosMsgs2');
    const res = inputs.res;
    try {
        await sendCursorResult(
            eradaniTransport,
            `
                select * from platsci.plmsgqp
                where date(plquets) between ? and ?
                and plapp = ?
                order by plquets
            `,
            [
                DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
                DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
                inputs.logType
            ],
            res,
            { fetchSize: 100 }
        );
    } catch (error) {
        logger.debug(error);
    }
}
