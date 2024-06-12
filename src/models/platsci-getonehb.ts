import eradaniConnect from '@eradani-inc/eradani-connect';

import { JSONObject } from 'src/types';

export default new eradaniConnect.run.Sql(
    `select distinct PLTHTRUCK as "Truck Number", PLTHHBID as "Hb Id#", PLTHTYPE as "Event Type", 
       PLTHRECV as "Received At",  substr(PLTHLOGA,1,19) as "Logged At", PLTHSPEED as "Speed",
       PLTHODO as "Odometer", PLTHODOJ as "Odometer Jump", PLTHHEAD as "Heading", PLTHIGNS as "Ignition",
       PLTHRPM as "Rpm", PLTHENGH as "Engine Hours", PLTHENGHJ as "Engine Hours Jump",
       PLTHWINM as "Wheels In Motion", PLTHACU as "Accuracy", PLTHSAT as "Satellites", 
       PLTHGPSV as "Gps Valid", PLTHHDOP as "Hdpo", PLTHFUEL as "Fuel Level", PLTHFUELU as "Total Fuel Used",
       PLTHLAT as "Latitude", PLTHLON as "Longitude", PLTHLOCD as "Location Description",
       PLTHRPD as "Rel Position Dist", PLTHRUM as "Rel Position Um", PLTHRDIR as "Rel Position Dir",
       PLTHRCITY as "Rel Position City", PLTHRSTATE as "Rel Position State", PLTHRCUNTR as "Rel Position Country"
       from platsci.pltmhbdp where  plthtype = 'hourly_periodic'  and substr(plthloga,12,2) = '23' 
       and date(plthrecv) between ? and ?
       order by plthtruck,substr(PLTHLOGA,1,19)`,
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
