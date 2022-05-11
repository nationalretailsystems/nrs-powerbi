import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	WOLFIASP.OLFILE5.ORDR.ORDEROR,
	WOLFIASP.OLFILE5.ORDR.TYPEOOR,
	WOLFIASP.OLFILE5.ORDR.AVLDTOR,
	WOLFIASP.OLFILE5.ORDR.DIV##OR,
	WOLFIASP.OLFILE5.ORDR.SCAC1OR,
	WOLFIASP.OLFILE5.ORDR.TRAL1OR,
	WOLFIASP.OLFILE5.ORDR.STATUOR,
	WOLFIASP.OLFILE5.LOCT.LOCID8,
	WOLFIASP.OLFILE5.LOCT.VNAME8,
	WOLFIASP.OLFILE5.LOCT.ADDRV8,
	WOLFIASP.OLFILE5.LOCT.CITYV8,
	WOLFIASP.OLFILE5.LOCT.STATV8,
	WOLFIASP.OLFILE5.LOCT.ZIPCV8,
	WOLFIASP.OLFILE5.DRIV.ENAMEDR,
	WOLFIASP.OLFILE5.DRIV.TYPCDDR,
	WOLFIASP.OLFILE5.ORDR.STADTOR 
FROM 
	WOLFIASP.OLFILE5.ORDR
	LEFT OUTER JOIN WOLFIASP.OLFILE5.LOCT
	ON 
		WOLFIASP.OLFILE5.ORDR.SHPCDOR = WOLFIASP.OLFILE5.LOCT.LOCID8
	LEFT OUTER JOIN WOLFIASP.OLFILE5.DRIV
	ON 
		WOLFIASP.OLFILE5.ORDR.DRVCDOR = WOLFIASP.OLFILE5.DRIV.EMPNODR
	 
WHERE 
	WOLFIASP.OLFILE5.ORDR.TYPEOOR IN( 'CT' )
	AND WOLFIASP.OLFILE5.ORDR.STADTOR > '12/25/2020'
	AND WOLFIASP.OLFILE5.ORDR.STATUOR = 'C'
	AND WOLFIASP.OLFILE5.ORDR.DIV##OR IN( '80T', '80' )
	AND WOLFIASP.OLFILE5.ORDR.SCAC1OR NOT IN( 'NRTC', 'XTRA' )
	AND WOLFIASP.OLFILE5.LOCT.LOCID8 LIKE '%NRT%'`
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
export interface SQLTemplateOutputNRT2PORT extends Array<SQLTemplateOutputRecord> {}
