import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT DISTINCT WOLFIASP.OLFILE5.BLHD.ACCT#H, WOLFIASP.OLFILE5.BLHD.ORDERH,
    WOLFIASP.OLFILE5.BLHD.PRODTH, WOLFIASP.OLFILE5.BLHD.ORIGNH, WOLFIASP.OLFILE5.BLHD.CONS#H,
    WOLFIASP.OLFILE5.BLHD.COCODH, WOLFIASP.OLFILE5.BLHD.MOVE#H, WOLFIASP.OLFILE5.BLHD.ILPROH,
    WOLFIASP.OLFILE5.BLHD.PRO##H
    FROM WOLFIASP.OLFILE5.BLHD
    WHERE 
        WOLFIASP.OLFILE5.BLHD.PRODTH > ?`,
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
export interface SQLTemplateInputBLHDACT {
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
export interface SQLTemplateOutputBLHDACT extends Array<SQLTemplateOutputRecord> {}
