import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	ARECS1,
	BLDGS1,
	OBDRS1,
	TRALS1,
	ACCTS1,
	CCITYZ,
	CARRCY,
	REQSTY,
	STATUY,
	STADTY 
FROM 
	WOLFIASP.CONFILE.SCOB SCOB
	LEFT OUTER JOIN WOLFIASP.CONFILE.CADR01 CADR01
	ON 
		SCOB.ACCTS1 = CADR01."ACCT#Z"
	LEFT OUTER JOIN WOLFIASP.YDFILE3.YARD03 YARD03
	ON 
		SCOB.TRALS1 = YARD03.EQUIPY
	 
WHERE 
	BLDGS1 = 'SAV' 
ORDER BY 
	3
`
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
export interface SQLTemplateOutputSAOBATDOOR extends Array<SQLTemplateOutputRecord> {}
