import createLogger from 'src/services/logger';

import SQLTemplateHEARTBEATS, {
    SQLTemplateInputGETHEARTBEATS,
    SQLTemplateOutputGETHEARTBEATS
} from 'src/models/platsci-getheartbeats';
import SQLTemplateGETLATESTHB, { SQLTemplateOutputGETLATESTHB } from 'src/models/platsci-getlatesthb';
import SQLTemplateDRIVPERF, { SQLTemplateInputDRIVPERF, SQLTemplateOutputDRIVPERF } from 'src/models/platsci-psdrivperf';
import { JSONObject } from 'src/types';
import { powerbiTransports } from 'src/services/connection';
import { DateTime } from 'luxon';
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
        secondUnit = '999999'
     } else {
        secondUnit = inputs.unit 
    }
    params.unit2 = secondUnit;    
    logger.debug('platsci.ts-' + params.toDate + ' ' + params.fromDate + ' ' + params.unit)
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
