import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT BLDG1X, TERM#H_1,  RECPT_DATE, 
    MANF_DATE,
    ICAR#H, CARRIH, INPROH, TOQTYH, TOWGTH, IPORTH,
    CONT#X, ACCT#C, ACNAMC, PROSTH FROM POWERBI.WEIGHTS 
    WHERE MANF_DATE BETWEEN ? AND ?  
    AND BLDG1X = ? 
    and 1= case  when bldg1x = 'O'  and COZIPH = '7047' then 1  when bldg1x <> 'O' then 1 else 0
          end`,
    {
        params: [
            {
                name: 'fromDate'
            },
            {
                name: 'toDate'
            },
            {
                name: 'building'
            }
        ]
    }
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
export interface SQLTemplateInputWEIGHTS {
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
export interface SQLTemplateOutputWEIGHTS extends Array<SQLTemplateOutputRecord> {}
