import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	"OPRO#SJ",
	PDATESJ,
	OACCTSJ,
	NACCTSJ,
	"NAMT$SJ",
	"OAMT$SJ",
	"CNET$SJ",
	"PNET$SJ",
	RDATESJ,
	RTIMESJ,
	"ACCT#A",
	NAMEAA,
	ORICCH 
FROM 
	WOLFIASP.WSFILE2.BLSJ BLSJ,  
	WOLFIASP.OLFILE5.CUST CUST,  
	WOLFIASP.WSFILE2.BLHD BLHD 
WHERE 
	BLSJ.OACCTSJ = CUST."ACCT#A"
	AND BLSJ."OPRO#SJ" = BLHD."PRO##H" 
        AND ORICCH IN ('946','948','941','972','970','930','933','969','929','963')`
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */

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
export interface SQLTemplateOutputBLSJ extends Array<SQLTemplateOutputRecord> {}
