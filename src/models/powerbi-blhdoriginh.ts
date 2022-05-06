import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	WOLFIASP.OLFILE5.ORDR.MANF#OR,
	WOLFIASP.OLFILE5.MOVE.MOVE#N,
	WOLFIASP.OLFILE5.MOVE.PRO##N,
	WOLFIASP.OLFILE5.ORDR.DIV##OR,
	WOLFIASP.OLFILE5.BLHD.ACCT#H,
	WOLFIASP.OLFILE5.BLHD.CONS#H,
	WOLFIASP.OLFILE5.BLHD.COBLTH,
	WOLFIASP.OLFILE5.BLHD.COCODH,
	WOLFIASP.OLFILE5.BLHD.MOVE#H,
	WOLFIASP.OLFILE5.BLHD.PRODTH 
FROM 
	WOLFIASP.OLFILE5.ORDR
	LEFT OUTER JOIN WOLFIASP.OLFILE5.MOVE
	ON 
		WOLFIASP.OLFILE5.ORDR.MANF#OR = WOLFIASP.OLFILE5.MOVE.MOVE#N
	LEFT OUTER JOIN WOLFIASP.OLFILE5.BLHD
	ON 
		WOLFIASP.OLFILE5.MOVE.PRO##N = WOLFIASP.OLFILE5.BLHD.PRO##H
	 
WHERE 
	WOLFIASP.OLFILE5.ORDR.DIV##OR IN( '75', '75M', '75S', '77', '77W' )
	AND WOLFIASP.OLFILE5.BLHD.PRODTH > ?`,
    {
        params: [
            {
                name: 'fromDate'
            }
        ]
    }
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
export interface SQLTemplateInputBLHDORIGH {
    /**
     * @description From Date
     */
    fromDate: number | string;
}
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
export interface SQLTemplateOutputBLHDORIGH extends Array<SQLTemplateOutputRecord> {}
