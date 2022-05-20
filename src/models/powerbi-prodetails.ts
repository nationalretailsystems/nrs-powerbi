import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	"ACCT#A",
	NAMEAA,
	ORICCH,
	PRODTH,
	"PRO##H",
	DESCRD AS DESCRD_1,
	PAIDFH,
	TOTALD,
	DESCRD,
	ORIGNA,
	GROUPA,
	AMTPDH,
	STAT1H,
	STAT2H,
	AMTOPH 
FROM 
	WOLFIASP.WSFILE2.BLHD BLHD,  
	WOLFIASP.OLFILE5.CUST CUST,  
	WOLFIASP.WSFILE2.BLDT BLDT 
WHERE 
	CUST."ACCT#A" = BLHD."ACCT#H"
	AND BLDT."PRO##D" = BLHD."PRO##H"
	AND ( PRODTH BETWEEN ? AND ?
	AND TOTALD > 0
	AND ARBALA > 0)`,
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

export interface SQLTemplateInputPRODTL {
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
export interface SQLTemplateOutputPRODTL extends Array<SQLTemplateOutputRecord> {}
