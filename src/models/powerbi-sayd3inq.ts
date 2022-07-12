import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	CONCAT( CARRCY, EQUIPY ) AS "VEHICLE NUMBER",
	CARRCY,
	EQUIPY,
	ETYPEY,
	LENGTY,
	FLEETY,
	TTYPEY,
	"FACL#Y",
	"YARD#Y",
	LTYPEY,
	"LOCT#Y",
	CONCAT( CONCAT( CONCAT( SUBSTRING( INBDTY, 4, 2 ), '/' ), CONCAT( SUBSTRING( INBDTY, 6, 2 ), '/' ) ), SUBSTRING( INBDTY, 2, 2 ) ) AS INBDTY,
	INBTMY,
	INBOPY,
	INCUSY,
	SEAL1Y,
	TRACTY,
	IBCARY,
	INSTSY,
	REQSTY,
	"REQ##Y",
	STATUY,
	CUSTCY,
	CONCAT( CONCAT( CONCAT( SUBSTRING( STADTY, 4, 2 ), '/' ), CONCAT( SUBSTRING( STADTY, 6, 2 ), '/' ) ), SUBSTRING( STADTY, 2, 2 ) ) AS STADTY,
	STATMY,
	REMRKY,
	CHASSY,
	DOORTY,
	GTPSTY,
	"GTP##Y",
	TRACKY,
	ETRAKY,
	LIFTGTY,
	MISC1Y,
	MISC2Y,
	MISC3Y,
	CHSPLY,
	RFTAGY,
	LSTDTY,
	CHAR( CURRENT_TIMESTAMP ) AS TODAY 
FROM 
	WOLFIASP.YDFILE3.YARD03 YARD03 
WHERE 
	"FACL#Y" = 'SA' 
ORDER BY 
	24, 
	38
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
export interface SQLTemplateOutputSAYD3INQ extends Array<SQLTemplateOutputRecord> {}
