import eradaniConnect from '@eradani-inc/eradani-connect';
import { JSONObject } from 'src/types';
/* eslint-disable capitalized-comments */
// XXX import configService from 'config';
// XXX const config = configService.get().eradaniConnect.native;
/* eslint-enable capitalized-comments */

export default new eradaniConnect.run.Sql(
    `SELECT 
	"PRO##EX",
	PDATEEX,
	"ACCT#EX",
	SHIPNEX,
	CONSNEX,
	SDESCEX,
	TOQTYEX,
	WGTACEX,
	RATESEX,
	TOTALEX,
	ORICCEX,
	RDATEEX,
	RTIMEEX,
	NAMEAA 
FROM 
	WOLFIASP.OLFILE5.CUST CUST,  
	WOLFIASP.WSFILE2.BLEX BLEX 
WHERE 
	CUST."ACCT#A" = BLEX."ACCT#EX"
        AND ORICCEX IN ('946','948','941','972','970','930','933','969','929','963')`
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
/* eslint-disable-next-line */
// export interface SQLTemplateInputMANIF {
/**
 * @description From Date
 */
/* eslint-disable-next-line */
//    fromDate: number | string;
// }
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
export interface SQLTemplateOutputBLEX extends Array<SQLTemplateOutputRecord> {}
