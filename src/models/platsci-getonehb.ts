import eradaniConnect from '@eradani-inc/eradani-connect';

import { JSONObject } from 'src/types';

export default new eradaniConnect.run.Sql(
    `with heartbeats as (select max(SUBSTR(PLTHLOGA, 1, 19)) as logstamp, PLTHTRUCK as truck, substr(plthloga,1,10) as logdate
    from platsci.pltmhbdp   
    where  DATE(plthrecv) BETWEEN ? AND ? 
      and plthtype in ('shutdown','startup','hourly_periodic')
    group by plthtruck,substr(plthloga,1,10)
    order by plthtruck,substr(plthloga,1,10) )
SELECT  PLTHTRUCK AS "Truck Number", PLTHHBID AS "Hb Id#", PLTHTYPE AS "Event Type",
        PLTHRECV AS "Received At", SUBSTR(PLTHLOGA, 1, 19) AS "Logged At", logstamp,
        PLTHSPEED AS "Speed", PLTHODO AS "Odometer", PLTHODOJ AS "Odometer Jump",
        PLTHHEAD AS "Heading", PLTHIGNS AS "Ignition", PLTHRPM AS "Rpm",
        PLTHENGH AS "Engine Hours", PLTHENGHJ AS "Engine Hours Jump",
        PLTHWINM AS "Wheels In Motion", PLTHACU AS "Accuracy", PLTHSAT AS "Satellites",
        PLTHGPSV AS "Gps Valid", PLTHHDOP AS "Hdpo", PLTHFUEL AS "Fuel Level",
        PLTHFUELU AS "Total Fuel Used", PLTHLAT AS "Latitude", PLTHLON AS "Longitude",
        PLTHLOCD AS "Location Description", PLTHRPD AS "Rel Position Dist",
        PLTHRUM AS "Rel Position Um", PLTHRDIR AS "Rel Position Dir",
        PLTHRCITY AS "Rel Position City", PLTHRSTATE AS "Rel Position State",
        PLTHRCUNTR AS "Rel Position Country"
    FROM heartbeats b left join platsci.pltmhbdp a 
    on a.plthtruck = b.truck and SUBSTR(PLTHLOGA, 1, 19) = b.logstamp
    ORDER BY plthtruck, SUBSTR(PLTHLOGA, 1, 19)
    `,
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
export interface SQLTemplateInputGETONEHB {
    /**
     * @description From Manifest Date
     */
    fromDate: number | string;
    /**
     * @description To Manifest Date
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
export interface SQLTemplateOutputGETONEHB extends Array<SQLTemplateOutputRecord> {}
