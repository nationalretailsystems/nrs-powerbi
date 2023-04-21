import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	"SBL##H",
	"ACCT#H",
	CCITYZ,
	"REC##H",
	"WREC#H",
	PONUMF,
	CONCAT( CONCAT( CONCAT( RECMMH, '/' ), CONCAT( RECDDH, '/' ) ), RECYYH ) AS RECMMH,
	"CONT#H",
	STAT1H,
	"DEPT#H",
	TOINVH,
	TOQTYH,
	TOWGTH,
	EMTDTCD,
	STATUCD,
	OPERIH,
	OPRUPH,
	TYPCTH,
	"SBL2#H",
	LODDDH,
	LODMMH,
	LODYYH,
	LDTMEH,
	LDURPH,
	LDRDTH,
	CADR1Z,
	ADDR2C,
	DESTNZ,
	DIVTNZ,
	"CBM##F",
	APRSQF,
	STYLEF,
	"QTY##F" 
FROM 
	WOLFIASP.CONFILE.RECH41 RECH41
	LEFT OUTER JOIN WOLFIASP.CONFILE.CUST01 CUST01
	ON 
		RECH41."ACCT#H" = CUST01."ACCT#C"
	LEFT OUTER JOIN WOLFIASP.CONFILE.RECP03 RECP03
	ON 
		RECH41."WREC#H" = RECP03."WREC#F"
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CTDT CTDT
	ON 
		RECH41."SBL##H" = CTDT."CONT#CD"
	LEFT OUTER JOIN WOLFIASP.CONFILE.CADR01 CADR01
	ON 
		RECH41."ACCT#H" = CADR01."ACCT#Z"
	 
WHERE 
	RECYYH = 23
	AND STAT1H <> 'V'
	AND STAT1H <> 'M'
	AND "TERM#H" = '95'
	AND "ACCT#H" BETWEEN 95000 AND 95999
	AND RECYYH = 23
	AND STATUCD <> 'NULL'
	AND EMTDTCD >= 1000000 + ?`,
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
export interface SQLTemplateInputSATJONDOCK {
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
export interface SQLTemplateOutputSATJONDOCK extends Array<SQLTemplateOutputRecord> {}
