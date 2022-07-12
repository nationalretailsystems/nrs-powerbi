import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	"RELS#R",
	TRAILR,
	"ACCT#R",
	BUILDR,
	CARRCR,
	CREATR,
	CONCAT( CONCAT( CONCAT( SUBSTRING( CRDATR, 4, 2 ), '/' ), 
	CONCAT( SUBSTRING( CRDATR, 6, 2 ), '/' ) ), 
	SUBSTRING( CRDATR, 2, 2 ) ) AS CRDATR,
	CRTIMR,
	"FACL#R",
	COMMTR,
	TOQTYR,
	TOWGTR,
	"PRO##R" 
FROM 
	WOLFIASP.YDFILE3.RELS22 RELS22 
WHERE 
	"FACL#R" = 'SA'`
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
export interface SQLTemplateOutputSARLSINQ extends Array<SQLTemplateOutputRecord> {}
