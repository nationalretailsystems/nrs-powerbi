import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `select buildx as "BLDG", 
    acct#m||'-'||substring(digits(stadrm),3,1) as "CUST#",  
    tcn##c as "DC#", ocar#m as "OUTCR", 
    case when NOBILM = 'Y' and strpdm > 0 then tolhlm - strpdm
     when nobilm = 'Y' and strpdm <= 0 then tolhlm
     when nobilm <> 'Y' then  tolhlm end as "L-HAUL",
    destnm as "DES", 
    case when actqtm <> 0  and  agoqtm <> 0 then 'CTN/GOH'  
        when  actqtm <> 0 then 'CTN'
        when agoqtm <> 0 then 'GOH'
        else ' ' end as "TYPE", 
    case when prelwm > 0 then 'H' else ' ' end as "P", 
    scaccm as "SCAC", ocarrm as "CARR", nobilm as "Y/N", 
    prefxm || ' ' || trlr1m as "TRALR", wmanfm as "CONT#", manf#m as "MANF#", winv#m as "INVOICE",  
    shopdate as "DATE" , mantmm as "TIME", actqtm as "QTY", actwtm as "WGT", 
    obpr2m as "PRO", comntm as "C O M M E N T" 
    from confile.manf02 
        left join confile.cust on acct#m = acct#c
        left join qgpl.shopcalv on shjulm = jd
        left join confile.detanb01 on acct#m = acct#x
    where ACCT#M in (select acct#x from confile.detanb01) 
        and shjulm >= (select jd from qgpl.shopcalv where ? = shopdate) 
        and shjulm <= (select jd from qgpl.shopcalv where ? = shopdate)
        order by acct#m`,
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
export interface SQLTemplateInputFED46R {
    /**
     * @description From Date
     */
    fromDate: number | string;
    /**
     * @description From Date
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
export interface SQLTemplateOutputFED46R extends Array<SQLTemplateOutputRecord> {}
