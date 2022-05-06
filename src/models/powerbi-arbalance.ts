import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	"ACCT#A",
	NAMEAA,
	ARBALA,
	ARB00A,
	ARB30A,
	ARB45A,
	ARB60A,
	ARB90A,
	ORIGNA,
	GROUPA,
	CRBALA,
	INTGLA 
FROM 
	WOLFIASP.OLFILE5.CUST CUST 
WHERE ARBALA > 0`
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
export interface SQLTemplateOutputARBAL extends Array<SQLTemplateOutputRecord> {}
