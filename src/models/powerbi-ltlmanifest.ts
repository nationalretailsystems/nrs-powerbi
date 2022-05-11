import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	WOLFIASP.OLFILE5.TRIP.DIV##T,
	WOLFIASP.OLFILE5.TRIP.TRIP#T,
	WOLFIASP.OLFILE5.TRIP.TTYPET,
	WOLFIASP.OLFILE5.TRIP.TRIDTT,
	WOLFIASP.OLFILE5.ORDR.ORDEROR,
	WOLFIASP.OLFILE5.ORDR.TYPEOOR,
	WOLFIASP.OLFILE5.ORDR.PRO##OR,
	WOLFIASP.OLFILE5.ORDR.MANF#OR,
	WOLFIASP.OLFILE5.BLHD.TOTALH,
	WOLFIASP.OLFILE5.BLHD.COBLTH,
	WOLFIASP.OLFILE5.ORDR.ACCT#OR,
	WOLFIASP.OLFILE5.BLHD.ACCT#H 
FROM 
	WOLFIASP.OLFILE5.TRIP
	LEFT OUTER JOIN WOLFIASP.OLFILE5.ORDR
	ON 
		WOLFIASP.OLFILE5.TRIP.TRIP#T = WOLFIASP.OLFILE5.ORDR.TRIP#OR
	LEFT OUTER JOIN WOLFIASP.OLFILE5.MOVE
	ON 
		WOLFIASP.OLFILE5.ORDR.MANF#OR = WOLFIASP.OLFILE5.MOVE.MOVE#N
	LEFT OUTER JOIN WOLFIASP.OLFILE5.BLHD
	ON 
		WOLFIASP.OLFILE5.MOVE.PRO##N = WOLFIASP.OLFILE5.BLHD.PRO##H
	 
WHERE 
	WOLFIASP.OLFILE5.TRIP.TRIDTT BETWEEN ? and ?
	AND WOLFIASP.OLFILE5.TRIP.DIV##T IN( '75', '75M', '77', '77W' )`,
    {
        params: [
            {
                name: 'fromDate'
            },
            {
                name: 'toDate'
            }
        ]
    }
);

export interface SQLTemplateInputLTLMAN {
    /**
     * @description From Date
     */
    fromDate: number | string;
    /**
     * @description To Date
     */
    toDate: number | string;
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
export interface SQLTemplateOutputLTLMAN extends Array<SQLTemplateOutputRecord> {}
