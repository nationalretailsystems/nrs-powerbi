import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	WOLFIASP.WSFILE2.BLHD.PRODTH,
	WOLFIASP.WSFILE2.BLHD.PRO##H,
	WOLFIASP.WSFILE2.BLHD.ACCT#H,
	WOLFIASP.WSFILE2.BLDT.SDESCD,
	WOLFIASP.OLFILE5.CUST.NAMEAA,
	WOLFIASP.WSFILE2.BLHD.CONSNH,
	WOLFIASP.WSFILE2.BLDT.DESCRD,
	WOLFIASP.WSFILE2.BLHD.ORICCH,
	WOLFIASP.WSFILE2.BLHD.DSTCCH,
	WOLFIASP.WSFILE2.BLHD.ORIGNH,
	WOLFIASP.WSFILE2.BLHD.DESTNH,
	WOLFIASP.WSFILE2.BLDT.TOTALD,
	WOLFIASP.WSFILE2.BLDT.QTYL1D,
	WOLFIASP.WSFILE2.BLDT.RATESD,
	WOLFIASP.WSFILE2.BLDT.WGTACD,
	WOLFIASP.WSFILE2.BLHD.AMTPDH,
	WOLFIASP.WSFILE2.BLHD.ORDERH,
	WOLFIASP.WSFILE2.BLHD.TOTALH,
	WOLFIASP.OLFILE5.ORDR.ORDEROR,
	WOLFIASP.OLFILE5.TRIP.TTYPET,
        WOLFIASP.OLFILE5.ORDR.SHPDTOR,
        WOLFIASP.OLFILE5.TRIP.HOURST,
        WOLFIASP.WSFILE2.BLHD.STAT2H
FROM 
	WOLFIASP.WSFILE2.BLHD
	INNER JOIN WOLFIASP.WSFILE2.BLDT
	ON 
		WOLFIASP.WSFILE2.BLHD.PRO##H = WOLFIASP.WSFILE2.BLDT.PRO##D
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CUST
	ON 
		WOLFIASP.WSFILE2.BLHD.ACCT#H = WOLFIASP.OLFILE5.CUST.ACCT#A
	LEFT OUTER JOIN WOLFIASP.OLFILE5.ORDR
	ON 
		WOLFIASP.WSFILE2.BLHD.PRO##H = WOLFIASP.OLFILE5.ORDR.PRO##OR
	LEFT OUTER JOIN WOLFIASP.OLFILE5.TRIP
	ON 
		WOLFIASP.OLFILE5.ORDR.TRIP#OR = WOLFIASP.OLFILE5.TRIP.TRIP#T
	 
WHERE 
	WOLFIASP.WSFILE2.BLHD.PRODTH between ? and  ?`,
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
export interface SQLTemplateInputBLHDQUERY {
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
export interface SQLTemplateOutputBLHDQUERY extends Array<SQLTemplateOutputRecord> {}
