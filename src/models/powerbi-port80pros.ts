import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	WOLFIASP.WSFILE2.BLHD.PRO##H,
        WOLFIASP.WSFILE2.BLHD.ORDERH,
	WOLFIASP.WSFILE2.BLHD.PRODTH,
	WOLFIASP.WSFILE2.BLHD.ILCARH,
	WOLFIASP.WSFILE2.BLHD.ACCT#H,
	WOLFIASP.WSFILE2.BLHD.ORIGNH,
	WOLFIASP.WSFILE2.BLHD.DESTNH,
	WOLFIASP.WSFILE2.BLDT.DESCRD,
	WOLFIASP.WSFILE2.BLDT.SDESCD,
	TOTALD 
FROM 
	WOLFIASP.WSFILE2.BLHD,  
	WOLFIASP.WSFILE2.BLDT 
WHERE 
	WOLFIASP.WSFILE2.BLHD.PRO##H = WOLFIASP.WSFILE2.BLDT.PRO##D
	AND(left( WOLFIASP.WSFILE2.BLHD.ORIGNH, 2 ) = '80'
	AND WOLFIASP.WSFILE2.BLHD.PRODTH BETWEEN  ? AND ?)`,
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

export interface SQLTemplateInputP80PROS {
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
export interface SQLTemplateOutputP80PROS extends Array<SQLTemplateOutputRecord> {}
