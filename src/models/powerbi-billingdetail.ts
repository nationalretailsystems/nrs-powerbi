import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	PRODTH,
	"PRO##H",
	"LINE#D",
	"ACCT#H",
	NAMEAA,
	CONSNH,
	ORICCH,
	DSTCCH,
	ORIGNH,
	DESTNH,
	SDESCD,
	DESCRD,
	RATESD,
	QTYL1D,
	TOTALD
FROM 
	WOLFIASP.WSFILE2.BLHD BLHD
	INNER JOIN WOLFIASP.WSFILE2.BLDT BLDT
	ON 
		BLHD."PRO##H" = BLDT."PRO##D"
	EXCEPTION JOIN WOLFIASP.WMSFILE2.WMSPROH WMSPROH
	ON 
		BLDT."PRO##D" = WMSPROH."HVPRO#"
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CUST CUST
	ON 
		BLHD."ACCT#H" = CUST."ACCT#A"
	 
WHERE 
	PRODTH BETWEEN ? AND ?
	AND ORICCH IN ('946', '948', '941', '972', '970', '930', '933', '969', '929', '963')
	AND TOTALD > '0'

UNION SELECT 
	PRODTH,
	"PRO##H",
	"DVSEQ#" AS "LINE#D",
	"ACCT#H",
	NAMEAA,
	CONSNH,
	ORICCH,
	DSTCCH,
	ORIGNH,
	DESTNH,
	DVACCD AS SDESCD,
	DVDESC AS DESCRD,
	DVRATE AS RATESD,
	DVQTY AS QTYL1D,
	DVTOTAL AS TOTALD
FROM 
	WOLFIASP.WSFILE2.BLHD BLHD
	INNER JOIN WOLFIASP.WMSFILE2.WMSPROH WMSPROH
	ON 
		BLHD."PRO##H" = WMSPROH."HVPRO#" AND
		BLHD.TOTALH = WMSPROH.HVAMT
	INNER JOIN WOLFIASP.WMSFILE2.WMSPROD WMSPROD
	ON 
		BLHD."PRO##H" = WMSPROD."DVPRO#"
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CUST CUST
	ON 
		BLHD."ACCT#H" = CUST."ACCT#A"
	 
WHERE 
	PRODTH BETWEEN ? AND ?
	AND ORICCH IN ('946', '948', '941', '972', '970', '930', '933', '969', '929', '963')

UNION SELECT 
	PRODTH,
	"PRO##H",
	"LINE#D",
	"ACCT#H",
	NAMEAA,
	CONSNH,
	ORICCH,
	DSTCCH,
	ORIGNH,
	DESTNH,
	SDESCD,
	DESCRD,
	RATESD,
	QTYL1D,
	TOTALD
 
FROM 
	WOLFIASP.WSFILE2.BLHD BLHD
	INNER JOIN WOLFIASP.WSFILE2.BLDT BLDT
	ON 
		BLHD."PRO##H" = BLDT."PRO##D"
	INNER JOIN WOLFIASP.WMSFILE2.WMSPROH WMSPROH
	ON 
		BLDT."PRO##D" = WMSPROH."HVPRO#" AND
		BLHD.TOTALH <> WMSPROH.HVAMT
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CUST CUST
	ON 
		BLHD."ACCT#H" = CUST."ACCT#A"
	 
WHERE
	PRODTH BETWEEN ? AND ?
	AND ORICCH IN ('946', '948', '941', '972', '970', '930', '933', '969', '929', '963')`,
    {
        params: [
            {
                name: 'fromDate'
            },
            {
                name: 'toDate'
            },
            {
                name: 'fromDate'
            },
            {
                name: 'toDate'
            },
            {
                name: 'fromDate'
            },
            {
                name: 'toDate'
            }
        ]
    }
);

export interface SQLTemplateInputBILLDTL {
    /**
     * @description From Date
     */
    fromDate: number | string;
    /**
     * @description To Date
     */
    toDate: number | string;
    fromDate2: number | string;
    toDate2: number | string;
    fromDate3: number | string;
    toDate3: number | string;
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
export interface SQLTemplateOutputBILLDTL extends Array<SQLTemplateOutputRecord> {}
