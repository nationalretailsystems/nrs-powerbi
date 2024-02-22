import eradaniConnect from '@eradani-inc/eradani-connect';

import { JSONObject } from 'src/types';

export default new eradaniConnect.run.Sql(
    `SELECT SBMTSN, SBASSETID, SBASSETTYP, SBOWNER, SBTTLMILES, SBTIMESTMP
    FROM mgrplus.sbttlmilep 
    WHERE date(SBTIMESTMP) BETWEEN ?  AND ?  
    `,
    {
        params: [
            {
                name: 'fromDate'
            },
            {
                name: 'toDate'
            }
        ]
    }
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
export interface SQLTemplateInputSKYBITZ {
    /**
     * @description From Manifest Date
     */
    fromDate: number | string;
    /**
     * @description To Manifest Date
     */
    toDate: number | string;
}

/**
 * Structure of records outputted by SQLTemplate SQL query
 *
 * @todo For future development, you may want to add the remaining SQLTemplate output fields here.
 */
export type SQLTemplateOutputRecord = JSONObject;

/**
 * Output Structure for SQLTemplate SQL query. This is an Array of
 * [[SQLTemplateOutputRecord]] elements.
 */
export interface SQLTemplateOutputSKYBITZ extends Array<SQLTemplateOutputRecord> {}
