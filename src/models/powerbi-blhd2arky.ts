import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	"PRO##H",
	PRODTH,
	"ACCT#H",
	SDESCD,
	TOTALD,
	ORIGNH,
	ORICCH,
	DSTCCH,
	DESTNH,
	SHIPNH,
	CONSNH,
	QTYL1D,
	RATESD,
	WGTACD 
FROM 
	WOLFIASP.KYFILE.BLHD BLHD
	INNER JOIN WOLFIASP.KYFILE.BLDT BLDT
	ON 
		BLHD."PRO##H" = BLDT."PRO##D"
	INNER JOIN WOLFIASP.OLFILE5.CUST CUST
	ON 
		BLHD."ACCT#H" = CUST."ACCT#A"
	LEFT OUTER JOIN WOLFIASP.OLFILE5.ORDR ORDR
	ON 
		BLHD.ORDERH = ORDR.ORDEROR
	LEFT OUTER JOIN WOLFIASP.OLFILE5.TRIP TRIP
	ON 
		ORDR."TRIP#OR" = TRIP."TRIP#T"
	 
WHERE 
	( PRODTH > ? )
    `,
    {
        params: [
            {
                name: 'fromDate'
            }
        ]
    }
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
export interface SQLTemplateInputBLHD2ARKY {
    /**
     * @description From Date
     */
    fromDate: number | string;
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
export interface SQLTemplateOutputBLHD2ARKY extends Array<SQLTemplateOutputRecord> {}
