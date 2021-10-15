import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT BLDG1X, TERM#H AS TERM#H_1,  DATE(TIMESTAMP_FORMAT(DIGITS(RECYYH) || 
    DIGITS(RECMMH) || DIGITS(RECDDH), 'YYMMDD')) AS RECPT_DATE, 
    DATE(TIMESTAMP_FORMAT(DIGITS(MANYYH) || DIGITS(MANMMH) || DIGITS(MANDDH), 'YYMMDD')) AS MANF_DATE,
    ICAR#H, CARRIH, INPROH, SUM(RECH.TOQTYH) AS TOQTYH, SUM(RECH.TOWGTH) AS TOWGTH, IPORTH,
    CONT#X, ACCT#C, ACNAMC, PROSTH FROM WOLFIASP.CONFILE.RECH RECH 
    INNER JOIN WOLFIASP.CONFILE.CUST CUST ON RECH.ACCT#H = CUST.ACCT#C 
    INNER JOIN WOLFIASP.CONFILE.CNTR CNTR ON RECH.CONT#H = CNTR.CONT#X 
    AND RECH.REJULH = CNTR.JULIAX AND RECH.BLDCDH = CNTR.BLDCDX 
    LEFT OUTER JOIN WOLFIASP.OLFILE5.BLHD BLHD ON RECH.INPROH = BLHD.PRO##H 
    WHERE ((((FAMGRC = 'TJ' AND RECH.STAT1H NOT IN ('V'))) AND BLDG1X = ?)) 
    AND DIGITS(MANYYH) || DIGITS(MANMMH) || DIGITS(MANDDH) BETWEEN ? AND ? 
    GROUP BY BLDG1X, TERM#H, 
    DATE(TIMESTAMP_FORMAT(DIGITS(RECYYH) || DIGITS(RECMMH) || DIGITS(RECDDH), 'YYMMDD')), 
    DATE(TIMESTAMP_FORMAT(DIGITS(MANYYH) || DIGITS(MANMMH) || DIGITS(MANDDH), 'YYMMDD')), 
    ICAR#H, CARRIH, INPROH, IPORTH, CONT#X, ACCT#C, ACNAMC, PROSTH`,
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
export interface SQLTemplateOutput extends Array<SQLTemplateOutputRecord> {}
