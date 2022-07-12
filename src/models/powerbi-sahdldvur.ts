import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	"CONT#X",
	SUM( JULIAX + 365 ) AS JULIAX,
	CTIMEX,
	BLDG1X,
	"ICAR#X",
	CARRIX,
	REMKSX,
	CTNSAX,
	BILLAX,
	BILLBX,
	RECPEX,
	RECPPX,
	RTIMEX,
	BLDCDX,
	LTRIM( VEHIDX ) AS VEHIDX,
	"SEAL#X",
	SUBHLX,
	TOTQTX,
	"UNLD#X",
	EMPTTX 
FROM 
	WOLFIASP.CONFILE.CNTR CNTR 
WHERE 
	BLDCDX = '95'
	AND EMPTTX > 1220301
	OR EMPTTX = 0
	AND BLDG1X = 'Z' 

GROUP BY 
	"CONT#X",
	CTIMEX,
	BLDG1X,
	"ICAR#X",
	CARRIX,
	REMKSX,
	CTNSAX,
	BILLAX,
	BILLBX,
	RECPEX,
	RECPPX,
	RTIMEX,
	BLDCDX,
	LTRIM( VEHIDX ),
	"SEAL#X",
	SUBHLX,
	TOTQTX,
	"UNLD#X",
	EMPTTX 
ORDER BY 
	2 DESC, 
	19 DESC
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
export interface SQLTemplateOutputSAHDLDVUR extends Array<SQLTemplateOutputRecord> {}
