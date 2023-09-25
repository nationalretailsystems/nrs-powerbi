import createLogger from 'src/services/logger';

import SQLTemplateHEARTBEATS, {
    SQLTemplateInputGETHEARTBEATS,
    SQLTemplateOutputGETHEARTBEATS
} from 'src/models/platsci-getheartbeats';
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
    const params: SQLTemplateInputGETHEARTBEATS = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        unit: inputs.unit
    };
    logger.debug('platsci.ts-' + params.toDate + ' ' + params.fromDate + ' ' + params.unit)
    return powerbiTransports.wolf.execute(SQLTemplateHEARTBEATS, params) as Promise<SQLTemplateOutputGETHEARTBEATS>;
}
