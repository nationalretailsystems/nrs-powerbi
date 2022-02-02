import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
    PRDATE,
    PRACCT,
    PRLOCS 
FROM 
    WOLFIASP.WMSFILE2.WMS378 WMS378 
WHERE 
    PRDATE BETWEEN ? AND ?`,
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

export interface SQLTemplateInput5 {
    /**
     * @description From Date
     */
     fromDate: number | string;
     /**
      * @description To Date
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
export interface SQLTemplateOutput5 extends Array<SQLTemplateOutputRecord> {}
