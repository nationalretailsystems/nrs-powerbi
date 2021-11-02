import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default  new eradaniConnect.run.Sql(
    `SELECT BLDG1X, TERM#H_1,  RECPT_DATE, 
    MANF_DATE,
    ICAR#H, CARRIH, INPROH, TOQTYH, TOWGTH, IPORTH,
    CONT#X, ACCT#C, ACNAMC, PROSTH FROM POWERBI.WEIGHTS 
    WHERE  BLDG1X = ? 
    AND MANF_DATE BETWEEN ? AND ? 
    `,
    {
        params: [
            {
                name: 'building'
            },
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
export interface SQLTemplateInput {
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
     building: string | string;    
};

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
export interface SQLTemplateOutput extends Array<SQLTemplateOutputRecord> {}

