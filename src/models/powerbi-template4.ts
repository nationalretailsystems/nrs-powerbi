import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT COMPANY AS "Company", ACCT_UNIT AS "Department",
TRIM(CHAR(ACCOUNT)) || '-' || CHAR(SUB_ACCOUNT) AS "Account", 'Actual' AS "Version",
ACCT_PERIOD AS "Month",
CASE
    WHEN TRAN_AMOUNT > 0 THEN 'Debit'
    ELSE 'Credit'
END AS "Measure", TRAN_AMOUNT AS "#Value", POSTING_DATE AS "Transaction Date",
R_SYSTEM AS SOURCE,
JE_TYPE || RIGHT('00000000' || TRIM(CHAR(LINE_NBR)), 8) AS "Transaction Number",
DESCRIPTION AS "Description"
FROM LAWAPP10P.DBGLGLT
WHERE FISCAL_YEAR = ?
   AND ACCT_PERIOD = ?
   AND DBGLGLT2_SS_SW = 'Y'
ORDER BY COMPANY, ACCT_UNIT, R_SYSTEM, JE_TYPE, LINE_NBR, ACCOUNT, SUB_ACCOUNT, SOURCE_CODE`,
    {
        params: [
            {
                name: 'year'
            },
            {
                name: 'month'
            }
        ]
    }
);

export interface SQLTemplateInput4 {
    /**
     * @description Year
     */
    year: number | string;
    /**
     * @description Month
     */
    month: number | string;
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
export interface SQLTemplateOutput4 extends Array<SQLTemplateOutputRecord> {}
