import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `SELECT newcc1a,
    DIV##1A,
   DIVNM1A,
   LOCID8,
   LOCTYP8,
   TERM#8,
   VNAME8,
   ADDRV8,
   CITYV8,
   STATV8,
   ZIPCV8
FROM olfile5.divi
     LEFT JOIN olfile5.loct
         ON locat1a = locid8
WHERE acrec1a = ' ' order by div##1a`
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */

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
export interface SQLTemplateOutputLOCATION extends Array<SQLTemplateOutputRecord> {}
