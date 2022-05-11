import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	WOLFIASP.OLFILE5.TRIP.TRIDTT,
	WOLFIASP.OLFILE5.TRIP.TRIP#T,
	WOLFIASP.OLFILE5.TRIP.HOURST,
	WOLFIASP.OLFILE5.TRIP.DIV##T 
FROM 
	WOLFIASP.OLFILE5.TRIP
WHERE 
	WOLFIASP.OLFILE5.TRIP.DIV##T IN( '80', '80G', '80T' )
	AND WOLFIASP.OLFILE5.TRIP.TRIDTT > ?
	AND WOLFIASP.OLFILE5.TRIP.HOURST > 0`,
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
export interface SQLTemplateInputP80KRONOS {
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
export interface SQLTemplateOutputP80KRONOS extends Array<SQLTemplateOutputRecord> {}
