import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `with cntr as (
SELECT BLDCDX,CONT#X,JULIAX,VEHIDX,
RECMMH,RECDDH,RECYYH
FROM confile.cntr, confile.rech
WHERE CONT#X = CONT#H and juliax = REJULH and
BLDCDX = BLDCDH and
JULIAX =   (select jd from qgpl.shopcal where date('1900-12-31') + jd days = to_date(?,'YYYYMMDD'))
and BLDCDX in ('68', '69') AND STAT1H <> 'V'
GROUP BY BLDCDX,CONT#X, JULIAX,VEHIDX,
RECMMH,RECDDH,RECYYH
ORDER BY BLDCDX,CONT#X)
select bldcdx, cont#x,
cntr.RECMMH||'/'||cntr.RECDDH||'/'||cntr.RECYYH as "Date", vehidx,
sum(toqtyh) as qty, sum(towgth) as whgtm, count(wrec#h) as rects
from cntr, confile.rech where bldcdx = bldcdh and cont#x = cont#h
and rejulh = juliax and stat1h <> 'V'
group by bldcdx,cont#x,juliax,vehidx,cntr.RECMMH||'/'||cntr.RECDDH||'/'||cntr.RECYYH
ORDER BY BLDCDX,CONT#X`,
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
export interface SQLTemplateInputCTRLLIST {
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
export interface SQLTemplateOutputCTRLLIST extends Array<SQLTemplateOutputRecord> {}
