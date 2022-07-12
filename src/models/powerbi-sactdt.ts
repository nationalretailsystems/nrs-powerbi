import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT 
	ORDERCD,
	"CONT#CD",
	"CONS#CH",
	CONCAT( CONCAT( CONCAT( SUBSTRING( LSTDTCD, 4, 2 ), '/' ), CONCAT( SUBSTRING( LSTDTCD, 6, 2 ), '/' ) ), SUBSTRING( LSTDTCD, 2, 2 ) ) AS LSTDTCD,
	CONCAT( CONCAT( CONCAT( SUBSTRING( RDYDTCD, 4, 2 ), '/' ), CONCAT( SUBSTRING( RDYDTCD, 6, 2 ), '/' ) ), SUBSTRING( RDYDTCD, 2, 2 ) ) AS RDYDTCD,
	CONCAT( CONCAT( CONCAT( SUBSTRING( SCHDTCD, 4, 2 ), '/' ), CONCAT( SUBSTRING( SCHDTCD, 6, 2 ), '/' ) ), SUBSTRING( SCHDTCD, 2, 2 ) ) AS SCHDTCD,
	CONCAT( CONCAT( CONCAT( SUBSTRING( PICDTCD, 4, 2 ), '/' ), CONCAT( SUBSTRING( PICDTCD, 6, 2 ), '/' ) ), SUBSTRING( PICDTCD, 2, 2 ) ) AS PICDTCD,
	CONCAT( CONCAT( CONCAT( SUBSTRING( EMTDTCD, 4, 2 ), '/' ), CONCAT( SUBSTRING( EMTDTCD, 6, 2 ), '/' ) ), SUBSTRING( EMTDTCD, 2, 2 ) ) AS EMTDTCD,
	CONCAT( CONCAT( CONCAT( SUBSTRING( RTNDTCD, 4, 2 ), '/' ), CONCAT( SUBSTRING( RTNDTCD, 6, 2 ), '/' ) ), SUBSTRING( RTNDTCD, 2, 2 ) ) AS RTNDTCD,
	QTYRCCD,
	WGTRCCD,
	CUBEMCD,
	"PRO##CD",
	STATUCD,
	CTSIZCD,
	CTTYPCD,
	"ORDR#CD",
	DCLOCCD,
	CONCAT( CONCAT( CONCAT( SUBSTRING( ETADTCH, 4, 2 ), '/' ), CONCAT( SUBSTRING( ETADTCH, 6, 2 ), '/' ) ), SUBSTRING( ETADTCH, 2, 2 ) ) AS ETADTCH,
	ORDR2CD,
	MTLO2CD,
	CHSPLCD,
	CHASSCD,
	VESELCH,
	CONCAT( CONCAT( CONCAT( SUBSTRING( ETAORCH, 4, 2 ), '/' ), CONCAT( SUBSTRING( ETAORCH, 6, 2 ), '/' ) ), SUBSTRING( ETAORCH, 2, 2 ) ) AS ETAORCH 
FROM 
	WOLFIASP.OLFILE5.CTDT CTDT
	LEFT OUTER JOIN WOLFIASP.OLFILE5.CTHD CTHD
	ON 
		CTDT.ORDERCD = CTHD.ORDERCH
	 
WHERE 
	DCLOCCD = 'NRTSAV' AND
	(SUBSTRING(PICDTCD, 2, 6 ) BETWEEN ? and ?	OR 
    SUBSTRING(RDYDTCD, 2, 6 ) BETWEEN ? and ? OR
	SUBSTRING(ETAORCH, 2, 6 ) BETWEEN ? AND ? ) 
ORDER BY 
	24`,
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

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
export interface SQLTemplateInputSACTDT {
    /**
     * @description From Manifest Date
     */
    fromDate: number | string;
    /**
     * @description To Manifest Date
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
export interface SQLTemplateOutputSACTDT extends Array<SQLTemplateOutputRecord> {}
