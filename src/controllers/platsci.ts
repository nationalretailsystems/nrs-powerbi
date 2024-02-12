import createLogger from 'src/services/logger';

import SQLTemplateHEARTBEATS, {
    SQLTemplateInputGETHEARTBEATS,
    SQLTemplateOutputGETHEARTBEATS
} from 'src/models/platsci-getheartbeats';
import SQLTemplateGETLATESTHB, { SQLTemplateOutputGETLATESTHB } from 'src/models/platsci-getlatesthb';
import SQLTemplateDRIVPERF, {
    SQLTemplateInputDRIVPERF,
    SQLTemplateOutputDRIVPERF
} from 'src/models/platsci-psdrivperf';
import SQLTemplateSKYBITZ, { SQLTemplateInputSKYBITZ, SQLTemplateOutputSKYBITZ } from 'src/models/platsci-skybitz';
import SQLTemplateGETDVIR, { SQLTemplateOutputGETDVIR } from 'src/models/platsci-psdvir';
import SQLTemplateGETHOSMSGS, {
    SQLTemplateInputGETHOSMSGS,
    SQLTemplateOutputGETHOSMSGS
} from 'src/models/platsci-psgethos';
import { JSONObject } from 'src/types';
import { powerbiTransports, transport as eradaniTransport } from 'src/services/connection';
import { DateTime } from 'luxon';
import odbc from 'odbc';
// X import { transport } from 'winston';

/*
import { WatchDirectoryFlags, createUnparsedSourceFile } from 'typescript';
import { transport } from 'winston';
import odbc from 'odbc';
*/
/* eslint-disable capitalized-comments */
// import { promises as fs } from 'fs';
// import APIError from 'src/APIError';
/* eslint-enable capitalized-comments */

const logger = createLogger('controllers/platsci');

export async function getHeartBeats(inputs: JSONObject): Promise<SQLTemplateOutputGETHEARTBEATS> {
    logger.debug('Calling SQLTemplate program');
    let secondUnit;
    const params: SQLTemplateInputGETHEARTBEATS = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        unit: inputs.unit,
        unit2: inputs.unit2
    };
    if (inputs.unit === '000000') {
        secondUnit = '999999';
    } else {
        secondUnit = inputs.unit;
    }
    params.unit2 = secondUnit;
    logger.debug('platsci.ts-' + params.toDate + ' ' + params.fromDate + ' ' + params.unit);
    return powerbiTransports.wolf.execute(SQLTemplateHEARTBEATS, params) as Promise<SQLTemplateOutputGETHEARTBEATS>;
}
export async function getLatestHB(): Promise<SQLTemplateOutputGETLATESTHB> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateGETLATESTHB) as Promise<SQLTemplateOutputGETLATESTHB>;
}
export async function getDrivperf(inputs: JSONObject): Promise<SQLTemplateOutputDRIVPERF> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputDRIVPERF = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateDRIVPERF, params) as Promise<SQLTemplateOutputDRIVPERF>;
}
export async function getSkybitz(inputs: JSONObject): Promise<SQLTemplateOutputSKYBITZ> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputSKYBITZ = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateSKYBITZ, params) as Promise<SQLTemplateOutputSKYBITZ>;
}
export async function getDvir(): Promise<SQLTemplateOutputGETDVIR> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateGETDVIR) as Promise<SQLTemplateOutputGETDVIR>;
}
// X export async function getHosMsgs(inputs: JSONObject): Promise<SQLTemplateOutputGETHOSMSGS> {
// X     logger.debug('Calling SQLTemplate program');
// X     const params: SQLTemplateInputGETHOSMSGS = {
// X         fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
// X         toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
// X         logType: inputs.logType
// X     };
// X     return powerbiTransports.wolf.execute(SQLTemplateGETHOSMSGS, params) as Promise<SQLTemplateOutputGETHOSMSGS>;
// X }
export async function getHosMsgs(inputs: JSONObject): Promise<SQLTemplateOutputGETHOSMSGS> {
    const res = inputs.res;
    try {
        const connection: odbc.Connection = await eradaniTransport.connect();
        const cursor = await connection.query(`select * from platsci.plmsgqp
        where date(plquets) between ? and ?
        and plapp = ?
        order by plquets`,
		[inputs.custNum, inputs.fromDate, inputs.logType],
		{
            cursor: true,
            fetchSize: 1000
        });
        res.status(200).type('application/json').write('[');
        while (!cursor.noData) {
            const chunk: odbc.Result<unknown> = await cursor.fetch();
            let chunkToWrite: string = '';
            if (chunk?.length) {
                for (let i = 0; i < chunk.length; i++) {
                    chunkToWrite += JSON.stringify(chunk[i]) + (i < chunk.length - 1 ? ',' : '');
                }
                res.write(chunkToWrite);
            }
        }
        await cursor.close();
        res.write(']');
        res.end();
    } catch (error) {
        logger.debug(error);
    }

    return [];
}
