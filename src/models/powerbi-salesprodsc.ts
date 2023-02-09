import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `with sales as (
        select 'NRT' as company,acct#h,totalh, prodth, ORICCH, DSTCCH, pro##h from wsfile2.blhd
         union all
        select 'KEY' as company,acct#h, totalh, prodth, ORICCH, DSTCCH, pro##h  from kyfile.blhd
         union all
        select 'WOR' as company,acct#h, totalh, prodth, ORICCH, DSTCCH, pro##h from wlfile.blhd
         union all
        select 'MIT' as company, acct#h, totalh, prodth, ORICCH, DSTCCH, pro##h  from mitfile.blhd
        ),
details as (
        select pro##D,totald, descrd, sdescd from wsfile2.bldt where totald <> 0
         union all
        select pro##D,totald, descrd, sdescd  from kyfile.bldt where totald <> 0
         union all
        select pro##D,totald, descrd, sdescd from wlfile.bldt where totald <> 0
         union all
        select pro##D,totald, descrd, sdescd  from mitfile.bldt where totald <> 0
        ),
summary as (
       SELECT
       company,
        CASE WHEN ORIGNA > ' ' THEN ORIGNA
         ELSE CAST(acct#a AS CHAR(5)) END AS ACCOUNT,
        CASE WHEN ORIGNA > ' ' THEN DESCR1
         ELSE NAMEAA END AS ACCOUNT_NAME,
       SUM(totalh) AS "SumTotalh",
       month(prodth) as "MONTH", year(prodth) as "YEAR", 
       ORICCH as ORIGCC, DSTCCH AS DESTCC, pro##h
       From blpgm.cust
         LEFT OUTER JOIN blpgm.grup
           ON origna = corpg1 AND group1 = ' '
         join sales ON acct#a = acct#h
        WHERE sales.PRODTH BETWEEN ? AND ?
       GROUP BY  
         company,
         CASE WHEN ORIGNA > ' ' THEN ORIGNA
            ELSE CAST(acct#a AS CHAR(5)) END,
         CASE WHEN ORIGNA > ' ' THEN DESCR1 ELSE NAMEAA END,
         month(prodth), year(prodth), ORICCH, DSTCCH, pro##h
        ORDER BY 5,4,1,6,7,8)
select a.company, a.account, A.ACCOUNT_NAME, A."MONTH", a."YEAR", 
A.ORIGCC, A.DESTCC,  b.* from summary a, details b 
where a.pro##h = b.pro##D order by 4,3,1,5,6,7`,
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

export interface SQLTemplateInputSALESPRODSC {
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
export interface SQLTemplateOutputSALESPRODSC extends Array<SQLTemplateOutputRecord> {}
