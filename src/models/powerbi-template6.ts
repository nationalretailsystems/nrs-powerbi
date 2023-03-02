import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `with sales as (
        select acct#h,totalh, prodth, ORICCH, DSTCCH from wsfile2.blhd where stat2h <> 'V'
         union all
        select acct#h, totalh, prodth, ORICCH, DSTCCH  from kyfile.blhd where stat2h <> 'V'
         union all
        select acct#h, totalh, prodth, ORICCH, DSTCCH from wlfile.blhd where stat2h <> 'V'
         union all
        select acct#h, totalh, prodth, ORICCH, DSTCCH  from mitfile.blhd where stat2h <> 'V'
        )
       SELECT
        CASE WHEN ORIGNA > ' ' THEN ORIGNA
         ELSE CAST(acct#a AS CHAR(5)) END AS ACCOUNT,
        CASE WHEN ORIGNA > ' ' THEN DESCR1
         ELSE NAMEAA END AS ACCOUNT_NAME,
       SUM(totalh) AS "SumTotalh",
       month(prodth) as "MONTH", year(prodth) as "YEAR", 
       ORICCH as ORIGCC, DSTCCH AS DESTCC
       From blpgm.cust
         LEFT OUTER JOIN blpgm.grup
           ON origna = corpg1 AND group1 = ' '
         join sales ON acct#a = acct#h
       WHERE sales.PRODTH BETWEEN ? AND ?
       GROUP BY  
         CASE WHEN ORIGNA > ' ' THEN ORIGNA
            ELSE CAST(acct#a AS CHAR(5)) END,
         CASE WHEN ORIGNA > ' ' THEN DESCR1 ELSE NAMEAA END,
         month(prodth), year(prodth), ORICCH, DSTCCH
        ORDER BY 5,4,1,6,7`,
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

export interface SQLTemplateInput6 {
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
export interface SQLTemplateOutput6 extends Array<SQLTemplateOutputRecord> {}
