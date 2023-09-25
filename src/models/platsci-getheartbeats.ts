import eradaniConnect from '@eradani-inc/eradani-connect';

import { JSONObject } from 'src/types';


export default new eradaniConnect.run.Sql(
    `SELECT *
    FROM PLATSCI.PLTMHBDP 
    WHERE substr(PLTHLOGA,1,10) BETWEEN ?  AND ?  
    AND PLTHTRUCK = ? 
    `,
    {
        params: [
            {
                name: 'fromDate'
            },
            {
                name: 'toDate'
            },
            {
                name: 'unit'
            }
        ]
    }
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
export interface SQLTemplateInputGETHEARTBEATS {
    /**
     * @description From Manifest Date
     */
    fromDate: number | string;
    /**
     * @description To Manifest Date
     */
    toDate: number | string;
    /**
     * @description Building Code
     */
    unit: string | string;
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
export interface SQLTemplateOutputGETHEARTBEATS extends Array<SQLTemplateOutputRecord> {}
