import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	TERMHB,
	CONTHB,
	AGPOHB,
	ALPOHB,
	"CBM#HB" AS "CBM#HB",
	QTYRHB,
	QTYIHB,
	ACCTHB,
	DCIDHB,
	CBMRHB,
	EMTDHB,
	"ITM#HB" AS "ITM#HB",
	VPRTHB,
	WRECHB 
FROM 
	WOLFIASP.CONFILE.HDBWH05 HDBWH05 
WHERE 
	TERMHB = '95'
	AND substring(EMTDHB,2,6) > ? 
ORDER BY 
	11 DESC`,
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
export interface SQLTemplateInputSAHDPO {
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
export interface SQLTemplateOutputSAHDPO extends Array<SQLTemplateOutputRecord> {}
