import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	DESTIN,
	IODIRECTIO,
	IODATE,
	STATUCD,
	IOTIMECHAR,
	DRIVERNAME,
	OPERFULLNA,
	TRACTOR,
	D_ICAR,
	CHASSIS,
	ETYPE,
	SCACTRAILR,
	SEAL1D,
	SEAL2D,
	GATEPASS,
	FACL,
	YARD,
	IBCUST,
	INSTAT,
	EMTDTCD,
	LSTDTCD,
	RDYDTCD,
	SCHDTCD,
	PICDTCD,
	RTNDTCD 
FROM 
	WOLFIASP.YDFILE3.YD472XSA YD472XSA
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CTDT CTDT
	ON 
		YD472XSA.SCACTRAILR = CTDT."CONT#CD"
	 
WHERE 
	IODIRECTIO = 'Out'
	AND ETYPE = 'C'
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
export interface SQLTemplateOutputSAANDREA extends Array<SQLTemplateOutputRecord> {}
