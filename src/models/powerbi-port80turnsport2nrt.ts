import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT DISTINCT  
	WOLFIASP.OLFILE5.CTDT.CONT#CD,
	WOLFIASP.OLFILE5.CTDT.PICDTCD,
	WOLFIASP.OLFILE5.DRIV.ENAMEDR,
	WOLFIASP.OLFILE5.LOCT.VNAME8,
	WOLFIASP.OLFILE5.CTDT.PUTIMCD,
	WOLFIASP.OLFILE5.CTDT.PUCARCD,
	WOLFIASP.OLFILE5.CTDT.STRTTCD,
	WOLFIASP.OLFILE5.CONS.CONSN9,
	WOLFIASP.OLFILE5.CONS.CITYC9,
	WOLFIASP.OLFILE5.CONS.STATE9,
	WOLFIASP.OLFILE5.CTHD.IMTYPCH,
	WOLFIASP.OLFILE5.CTDT.CHASSCD,
	WOLFIASP.OLFILE5.DRIV.GROUPDR,
	WOLFIASP.OLFILE5.DRIV.EMPNODR,
	WOLFIASP.OLFILE5.ORDR.TYPEOOR,
	WOLFIASP.OLFILE5.DRIV.TYPCDDR,
	WOLFIASP.OLFILE5.CTDT.ORDERCD 
FROM 
	WOLFIASP.OLFILE5.CTDT
	INNER JOIN WOLFIASP.OLFILE5.CTHD
	ON 
		WOLFIASP.OLFILE5.CTDT.ORDERCD = WOLFIASP.OLFILE5.CTHD.ORDERCH
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CONS
	ON 
		WOLFIASP.OLFILE5.CTHD.CONS#CH = WOLFIASP.OLFILE5.CONS.CONS#9
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CUST
	ON 
		WOLFIASP.OLFILE5.CUST.ACCT#A = WOLFIASP.OLFILE5.CONS.CONS#9
	LEFT OUTER JOIN WOLFIASP.OLFILE5.LOCT
	ON 
		WOLFIASP.OLFILE5.LOCT.LOCID8 = WOLFIASP.OLFILE5.CTHD.PULOCCH
	LEFT OUTER JOIN WOLFIASP.OLFILE5.BLHD
	ON 
		WOLFIASP.OLFILE5.CTDT.PRO##CD = WOLFIASP.OLFILE5.BLHD.PRO##H
	LEFT OUTER JOIN WOLFIASP.OLFILE5.ORDR
	ON 
		WOLFIASP.OLFILE5.CTDT.ORDR#CD = WOLFIASP.OLFILE5.ORDR.ORDEROR
	LEFT OUTER JOIN WOLFIASP.OLFILE5.DRIV
	ON 
		WOLFIASP.OLFILE5.ORDR.DRVCDOR = WOLFIASP.OLFILE5.DRIV.EMPNODR
	 
WHERE 
	( ( ( WOLFIASP.OLFILE5.CTHD.TERM#CH IN( '80' ))))
	AND WOLFIASP.OLFILE5.CTDT.PUCARCD IN( 'NRTC', 'PLPO', 'PTJJ' )`
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
export interface SQLTemplateOutputPORT2NRT extends Array<SQLTemplateOutputRecord> {}
