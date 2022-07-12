import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	TRALS2,
	WRECS2,
	ACCTS2,
	STATS2,
	BLDGS2,
	OBDTS2,
	OBTMS2,
	OCODS2,
	OBDRS2,
	WMANF2 
FROM 
	WOLFIASP.CONFILE.SCRC03 SCRC03 
WHERE 
	BLDGS2 = 'SAV'
	AND OBDTS2 > ? `,
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
export interface SQLTemplateInputSAOBSCANS {
    /**
     * @description From Manifest Date
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
export interface SQLTemplateOutputSAOBSCANS extends Array<SQLTemplateOutputRecord> {}
