import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	ORDEROR,
	ORIGNA,
	NAMEAA,
	SHPDTOR,
	TYPEOOR,
	SHPCDOR,
	LOCT.VNAME8,
	LOCT.ADDRV8,
	LOCT.CITYV8,
	LOCT.STATV8,
	LOCT.ZIPCV8 AS ZIPCV8_1,
	CONCDOR,
	LOCT_1.ADDRV8 AS ADDRV8_1,
	LOCT_1.CITYV8 AS CITYV8_1,
	LOCT_1.STATV8 AS STATV8_1,
	LOCT_1.ZIPCV8,
	LOCT_1.VNAME8 AS VNAME8_1,
	TYPCDDR,
	GROUPDR,
	NAMEAI,
	STATUOR 
FROM 
	WOLFIASP.OLFILE5.ORDR ORDR
	LEFT OUTER JOIN WOLFIASP.OLFILE5.LOCT LOCT
	ON 
		ORDR.SHPCDOR = LOCT.LOCID8
	LEFT OUTER JOIN WOLFIASP.OLFILE5.LOCT LOCT_1
	ON 
		LOCT.ACREC8 = LOCT_1.ACREC8 AND
		ORDR.CONCDOR = LOCT_1.LOCID8
	LEFT OUTER JOIN WOLFIASP.OLFILE5.DRIV DRIV
	ON 
		ORDR.DRVCDOR = DRIV.EMPNODR
	LEFT OUTER JOIN WOLFIASP.WSFILE2.BLHD BLHD
	ON 
		ORDR.ORDEROR = BLHD.ORDERH
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CUST CUST
	ON 
		ORDR."ACCT#OR" = CUST."ACCT#A"
	LEFT OUTER JOIN WOLFIASP.OLFILE5.ILCA ILCA
	ON 
		DRIV.GROUPDR = ILCA.ILCODI
	 
WHERE 
	STATUOR NOT IN( 'X' )
	AND TYPEOOR NOT IN( 'LP', 'LD', 'SH' )
	AND SHPDTOR BETWEEN ? AND ? `,
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

export interface SQLTemplateInputKCALLSHIP {
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
export interface SQLTemplateOutputKCALLSHIP extends Array<SQLTemplateOutputRecord> {}
