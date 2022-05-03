import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	PRODTH,
	"PRO##H",
	"ACCT#H",
	SDESCD,
	NAMEAA,
	CONSNH,
	DESCRD,
	ORICCH,
	DSTCCH,
	ORIGNH,
	DESTNH,
	TOTALD,
	QTYL1D,
	RATESD,
	WGTACD,
	MONTHNAME( PRODTH ) AS PRODTH_1,
	YEAR( PRODTH ) AS PRODTH_2,
	PRODTH + ( 7 - DAYOFWEEK( PRODTH ) ) DAY AS COLUMN0000,
	DESCRC,
	AMTPDH,
	ORDERH,
	TOTALH,
	ORDEROR,
	TTYPET,
	"DIV##OR" 
FROM 
	WOLFIASP.WSFILE2.BLHD BLHD
	INNER JOIN WOLFIASP.WSFILE2.BLDT BLDT
	ON 
		BLHD."PRO##H" = BLDT."PRO##D"
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CUST CUST
	ON 
		BLHD."ACCT#H" = CUST."ACCT#A"
	LEFT OUTER JOIN WOLFIASP.WSFILE2."DESC" TDESC
	ON 
		BLDT.SDESCD = TDESC.DCODEC
	LEFT OUTER JOIN WOLFIASP.OLFILE5.ORDR ORDR
	ON 
		BLHD."PRO##H" = ORDR."PRO##OR"
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
export interface SQLTemplateInputBLHD2AR {
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
export interface SQLTemplateOutputBLHD2AR extends Array<SQLTemplateOutputRecord> {}
