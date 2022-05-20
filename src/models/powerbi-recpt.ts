import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	FAMGWR,
	FSGRWR,
	ACCTWR,
	NAMEWR,
	CQTYWR,
	CWGTWR,
	CGOHWR,
	PQTYWR,
	PWGTWR,
	PGOHWR,
	IQTYWR,
	IWGTWR,
	IGOHWR,
	OQTYWR,
	OWGTWR,
	OGOHWR,
	TQTYWR,
	TWGTWR,
	TGOHWR,
	RECDWR,
	WRECWR 
FROM 
	WOLFIASP.CONFILE.WKRC WKRC 
WHERE 
	RECDWR > ?
    `,
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
export interface SQLTemplateInputRECPT {
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
export interface SQLTemplateOutputRECPT extends Array<SQLTemplateOutputRecord> {}
