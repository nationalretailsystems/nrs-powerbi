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

export const connect3  = new eradaniConnect.run.Sql(`SELECT 
    ALGNTIME.CSTCNTR,
    right( ALGNTIME.CCDPT, 3 ) AS CCDPT,
    ALGNTIME.DSDESC,
    ALGNTIME.GNNAME,
    ALGNTIME.DTSTAMP,
    ALGNTIME.DTSTAMP + ( 7 - dayofweek( ALGNTIME.DTSTAMP ) ) day AS WEDTM,
    SUM( ALGNTIME.RG01 + ALGNTIME.RG02 + ALGNTIME.RG03 + ALGNTIME.RG04 + ALGNTIME.RG05 + ALGNTIME.RG06 + ALGNTIME.RG07 + ALGNTIME.RG08 + ALGNTIME.RG09 + ALGNTIME.RG10 ) AS RG,
    SUM( ALGNTIME.OT01 + ALGNTIME.OT02 + ALGNTIME.OT03 + ALGNTIME.OT04 + ALGNTIME.OT05 + ALGNTIME.OT06 + ALGNTIME.OT07 + ALGNTIME.OT08 + ALGNTIME.OT09 + ALGNTIME.OT10 ) AS OT,
    SUM( ALGNTIME.DB01 + ALGNTIME.DB02 + ALGNTIME.DB03 + ALGNTIME.DB04 + ALGNTIME.DB05 + ALGNTIME.DB06 + ALGNTIME.DB07 + ALGNTIME.DB08 + ALGNTIME.DB09 + ALGNTIME.DB10 ) AS DB 
FROM (SELECT  TIEMPN, GNNAME, DATE( CHAR( TIATIM ) ) AS DTSTAMP, LEFT( TISEC2, 3 ) AS CSTCNTR, DSDESC, trim( TISEC2 ) AS CCDPT,
    CASE WHEN TIPC01 = 'REG' THEN TIHR01 ELSE 0 END AS RG01,
    CASE WHEN TIPC02 = 'REG' THEN TIHR02 ELSE 0 END AS RG02,
    CASE WHEN TIPC03 = 'REG' THEN TIHR03 ELSE 0 END AS RG03,
    CASE WHEN TIPC04 = 'REG' THEN TIHR04 ELSE 0 END AS RG04,
    CASE WHEN TIPC05 = 'REG' THEN TIHR05 ELSE 0 END AS RG05,
    CASE WHEN TIPC06 = 'REG' THEN TIHR06 ELSE 0 END AS RG06,
    CASE WHEN TIPC07 = 'REG' THEN TIHR07 ELSE 0 END AS RG07,
    CASE WHEN TIPC08 = 'REG' THEN TIHR08 ELSE 0 END AS RG08,
    CASE WHEN TIPC09 = 'REG' THEN TIHR09 ELSE 0 END AS RG09,
    CASE WHEN TIPC10 = 'REG' THEN TIHR10 ELSE 0 END AS RG10,
    CASE WHEN TIPC01 = 'OT' THEN TIHR01 ELSE 0 END AS OT01,
    CASE WHEN TIPC02 = 'OT' THEN TIHR02 ELSE 0 END AS OT02,
    CASE WHEN TIPC03 = 'OT' THEN TIHR03 ELSE 0 END AS OT03,
    CASE WHEN TIPC04 = 'OT' THEN TIHR04 ELSE 0 END AS OT04,
    CASE WHEN TIPC05 = 'OT' THEN TIHR05 ELSE 0 END AS OT05,
    CASE WHEN TIPC06 = 'OT' THEN TIHR06 ELSE 0 END AS OT06,
    CASE WHEN TIPC07 = 'OT' THEN TIHR07 ELSE 0 END AS OT07,
    CASE WHEN TIPC08 = 'OT' THEN TIHR08 ELSE 0 END AS OT08,
    CASE WHEN TIPC09 = 'OT' THEN TIHR09 ELSE 0 END AS OT09,
    CASE WHEN TIPC10 = 'OT' THEN TIHR10 ELSE 0 END AS OT10,
    CASE WHEN TIPC01 = 'DBL' THEN TIHR01 ELSE 0 END AS DB01,
    CASE WHEN TIPC02 = 'DBL' THEN TIHR02 ELSE 0 END AS DB02,
    CASE WHEN TIPC03 = 'DBL' THEN TIHR03 ELSE 0 END AS DB03,
    CASE WHEN TIPC04 = 'DBL' THEN TIHR04 ELSE 0 END AS DB04,
    CASE WHEN TIPC05 = 'DBL' THEN TIHR05 ELSE 0 END AS DB05,
    CASE WHEN TIPC06 = 'DBL' THEN TIHR06 ELSE 0 END AS DB06,
    CASE WHEN TIPC07 = 'DBL' THEN TIHR07 ELSE 0 END AS DB07,
    CASE WHEN TIPC08 = 'DBL' THEN TIHR08 ELSE 0 END AS DB08,
    CASE WHEN TIPC09 = 'DBL' THEN TIHR09 ELSE 0 END AS DB09,
    CASE WHEN TIPC10 = 'DBL' THEN TIHR10 ELSE 0 END AS DB10 
FROM WOLFIASP.CLOCFILE00.CKTIMEFL CKTIMEFL 
    LEFT OUTER JOIN WOLFIASP.CLOCFILE00.CKEMPGEN CKEMPGEN
    ON CKTIMEFL.TIEMPN = CKEMPGEN.GNEMPN
    LEFT OUTER JOIN WOLFIASP.CLOCFILE00.CKDESCMS CKDESCMS
    ON CKTIMEFL.TISEC2 = CKDESCMS.DSKEYM
WHERE DATE( CHAR( CKTIMEFL.TIATIM ) ) BETWEEN ? and ?
    AND CKDESCMS.DSCODE = 'E'
    and isnumeric(substring(CKDESCMS.DSKEYM,1,6)) = 'Y' and isnumeric(substring(CKDESCMS.DSKEYM,7,4)) = 'N'
    and CKTIMEFL.TIATIM > 20000000000000 and substring(CKDESCMS.DSKEYM,1,3) between  ? and ?
) ALGNTIME 
GROUP BY ALGNTIME.CSTCNTR, right( ALGNTIME.CCDPT, 3 ), ALGNTIME.DSDESC,
    ALGNTIME.GNNAME, ALGNTIME.DTSTAMP, ALGNTIME.DTSTAMP + ( 7 - dayofweek( ALGNTIME.DTSTAMP ) ) day
order  by CSTCNTR, CCDPT`,
    {
    params: [
        {
            name: 'fromDate'
        },
        {
            name: 'toDate'
        },
        {
            name: 'costCenter1'
        },
        {
            name: 'costCenter2'
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
export interface SQLTemplateInput3 {
    /**
     * @description From Date
     */
    fromDate: number | string;
    /**
     * @description To Date
     */
    toDate: number | string;
    /**
    * @description Cost Center
    */
     costCenter1: string | string;
    /**
    * @description Cost Center
    */
     costCenter2: string | string;       
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

