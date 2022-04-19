import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `select 
    CASE WHEN ETYPEY IN ('T','R')  THEN TRIM(CARRCY) || '-' || EQUIPY
         WHEN ETYPEY = 'X' then EQUIPY  
         ELSE TRIM(CARRCY) || EQUIPY END AS "Asset",
    CASE 
         WHEN LTYPEY IN ('S','D') THEN YARD#Y || LTYPEY || DIGITS(LOCT#Y) 
         WHEN LTYPEY = 'R' THEN YARD#Y || ' Row ' || LOCT#Y
         WHEN LTYPEY = 'U' THEN YARD#Y || ' Uns ' || LOCT#Y
         ELSE  YARD#Y || LTYPEY || LOCT#Y END AS "Spot" ,
    CASE WHEN RFTAGY <> ' ' THEN '340853E1D402FC0000' || RFTAGY
         else  ' '  END as "Tag ID" ,
     etypey as Equipment
     from ydfile3.yard 
     where FACL#Y = ? and ETYPEY in ('T','C','R','Z')
     ORDER BY YARD#Y,LTYPEY,LOCT#Y`,
    {
        params: [
            {
                name: 'fromYard'
            }
        ]
    }
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
export interface SQLTemplateInput7 {
    /**
     * @description fromYard
     */
    fromYard: string | string;
}

export type SQLTemplateOutputRecord = JSONObject;

/**
 * Output Structure for SQLTemplate SQL query. This is an Array of
 * [[SQLTemplateOutputRecord]] elements.
 */
export interface SQLTemplateOutput extends Array<SQLTemplateOutputRecord> {}
