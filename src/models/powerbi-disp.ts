import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	WOLFIASP.OLFILE5.DISP.ORDERDI,
	WOLFIASP.OLFILE5.DISP.DISP#DI,
	WOLFIASP.OLFILE5.DISP.DIVI#DI,
	WOLFIASP.OLFILE5.DISP.TRIP#DI,
	WOLFIASP.OLFILE5.DISP.DISDTDI,
	WOLFIASP.OLFILE5.DISP.DRIV1DI,
	WOLFIASP.OLFILE5.DISP.DISTMDI,
	WOLFIASP.OLFILE5.TRIP.TTYPET,
        WOLFIASP.OLFILE5.DISP.MILESDI,
        WOLFIASP.OLFILE5.DISP.EMPTYDI,
        WOLFIASP.OLFILE5.DISP.CALCMDI,
        WOLFIASP.OLFILE5.DISP.#LOADDI,
        WOLFIASP.OLFILE5.DISP.#EMPTDI
FROM 
	WOLFIASP.OLFILE5.DISP
	LEFT OUTER JOIN WOLFIASP.OLFILE5.TRIP
	ON 
		WOLFIASP.OLFILE5.DISP.TRIP#DI = WOLFIASP.OLFILE5.TRIP.TRIP#T
	 
WHERE 
	WOLFIASP.OLFILE5.DISP.DISDTDI between ? and ? 
	AND WOLFIASP.OLFILE5.DISP.DIVI#DI IN( '75', '75M', '75S', '77', '77W' )`,
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

export interface SQLTemplateInputDISP {
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
export interface SQLTemplateOutputDISP extends Array<SQLTemplateOutputRecord> {}
