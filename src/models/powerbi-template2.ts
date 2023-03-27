import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT PRODTH, PRO##H, ACCT#H, SDESCD, NAMEAA, CONSNH, DESCRD, ORICCH, DSTCCH, ORIGNH, DESTNH, 
    TOTALD, QTYL1D, RATESD, WGTACD, MONTHNAME(PRODTH) AS PRODTH_1, YEAR(PRODTH) AS PRODTH_2,
    PRODTH + (7 - DAYOFWEEK(PRODTH)) DAY AS "W/E Date", DESCRC
    FROM WOLFIASP.WSFILE2.BLHD BLHD
         INNER JOIN WOLFIASP.WSFILE2.BLDT BLDT
             ON BLHD.PRO##H = BLDT.PRO##D
         LEFT OUTER JOIN WOLFIASP.OLFILE5.CUST CUST
             ON BLHD.ACCT#H = CUST.ACCT#A
         LEFT OUTER JOIN WOLFIASP.WSFILE2.DESC TDESC
             ON BLDT.SDESCD = TDESC.DCODEC
             WHERE ((PRODTH BETWEEN ? AND ?))
             AND ACCT#H between  ? and ?
             AND ORICCH BETWEEN ? and ?       
            `,
    //  AND ORICCH IN ( ? )
    {
        params: [
            {
                name: 'fromDate'
            },
            {
                name: 'toDate'
            },
            {
                name: 'customer1'
            },
            {
                name: 'customer2'
            },
            {
                name: 'costcenter1'
            },
            {
                name: 'costcenter2'
            }
        ]
    }
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */

export interface SQLTemplateInput2 {
    /**
     * @description From Manifest Date
     */
    fromDate: number | string;
    /**
     * @description To Manifest Date
     */
    toDate: number | string;
    /**
     * @description Cost Center
     */
    costcenter1: string | string;
    /**
     * @description Cost Center
     */
    costcenter2: string | string;
    /**
     * @description Customer Number
     */
    customer1: number | string;
    /**
     * @description Customer Number
     */
    customer2: number | string;
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
export interface SQLTemplateOutput2 extends Array<SQLTemplateOutputRecord> {}
