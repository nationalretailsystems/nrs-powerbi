import eradaniConnect from '@eradani-inc/eradani-connect';
import { AlphanumericLocale } from 'express-validator/src/options';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `select * from platsci.plmsgqp
where date(plquets) between ? and ?
and plapp = ?
order by plquets`,
    {
        params: [
            {
                name: 'fromDate'
            },
            {
                name: 'toDate'
            },
            {
                name: 'logType'
            }
        ]
    }
);

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
export interface SQLTemplateInputGETHOSMSGS {
    /**
     * @description From Date
     */
    fromDate: number | string;
    /**
     * @description From Date
     */
    toDate: number | string;
    logType: string | string;
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
export interface SQLTemplateOutputGETHOSMSGS extends Array<SQLTemplateOutputRecord> {}
