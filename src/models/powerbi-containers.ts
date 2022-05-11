import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	WOLFIASP.OLFILE5.CTDT.CONT#CD,
	WOLFIASP.OLFILE5.CTDT.ORDR#CD,
	WOLFIASP.OLFILE5.CTHD.TERM#CH,
	WOLFIASP.OLFILE5.CTDT.DCLOCCD,
CASE WHEN WOLFIASP.OLFILE5.CTDT.PICDTCD = 0 THEN '0001-01-01' ELSE
    DATE(TIMESTAMP_FORMAT(SUBSTR(DIGITS(WOLFIASP.OLFILE5.CTDT.PICDTCD), 2, 6), 'YYMMDD')) END  AS PICDTCD,
	WOLFIASP.OLFILE5.CTDT.PICDTCD,
	WOLFIASP.OLFILE5.CUST.ORIGNA,
	WOLFIASP.OLFILE5.CUST.GROUPA,
	WOLFIASP.OLFILE5.CUST.ACCT#A,
	WOLFIASP.OLFILE5.ORDR.ACCT#OR 
FROM 
	WOLFIASP.OLFILE5.CTDT
	INNER JOIN WOLFIASP.OLFILE5.CTHD
	ON 
		WOLFIASP.OLFILE5.CTDT.ORDERCD = WOLFIASP.OLFILE5.CTHD.ORDERCH
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CUST
	ON 
		WOLFIASP.OLFILE5.CTHD.CONS#CH = WOLFIASP.OLFILE5.CUST.ACCT#A
	LEFT OUTER JOIN WOLFIASP.OLFILE5.LOCT
	ON 
		WOLFIASP.OLFILE5.CTHD.PULOCCH = WOLFIASP.OLFILE5.LOCT.LOCID8
	LEFT OUTER JOIN WOLFIASP.OLFILE5.ORDR
	ON 
		WOLFIASP.OLFILE5.CTDT.ORDR#CD = WOLFIASP.OLFILE5.ORDR.ORDEROR
	LEFT OUTER JOIN WOLFIASP.OLFILE5.DRIV
	ON 
		WOLFIASP.OLFILE5.ORDR.DRVCDOR = WOLFIASP.OLFILE5.DRIV.EMPNODR 
WHERE CASE WHEN PICDTCD = 0 THEN '0001-01-01' ELSE  
DATE(TIMESTAMP_FORMAT(SUBSTR(DIGITS(WOLFIASP.OLFILE5.CTDT.PICDTCD), 2, 6), 'YYMMDD')) END 
BETWEEN ? AND ?`,
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

export interface SQLTemplateInputCONT {
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
export interface SQLTemplateOutputCONT extends Array<SQLTemplateOutputRecord> {}
