import eradaniConnect from '@eradani-inc/eradani-connect';

import { JSONObject } from 'src/types';


export default new eradaniConnect.run.Sql(
    `with maximum as (select max(plthloga) as key,  plthtruck as truck from platsci.pltmhbdp
    group by plthtruck)
    select a.PLTHTRUCK as "Truck Number", a.PLTHHBID as "Hb Id#", a.PLTHTYPE as "Event Type",
     a.PLTHRECV as "Received At", substr(a.PLTHLOGA,1,19) as "Logged At", a.PLTHSPEED as "Speed",
     a.PLTHODO as "Odometer", a.PLTHODOJ as "Odometer Jump", a.PLTHHEAD as "Heading", a.PLTHIGNS as "Ignition",
     a.PLTHRPM as "Rpm", a.PLTHENGH as "Engine Hours", a.PLTHENGHJ as "Engine Hours Jump",
     a.PLTHWINM as "Wheels In Motion", a.PLTHACU as "Accuracy", a.PLTHSAT as "Satellites", 
     a.PLTHGPSV as "Gps Valid", a.PLTHHDOP as "Hdpo", a.PLTHFUEL as "Fuel Level", a.PLTHFUELU as "Total Fuel Used",
     a.PLTHLAT as "Latitude", a.PLTHLON as "Longitude", a.PLTHLOCD as "Location Description",
     a.PLTHRPD as "Rel Position Dist", a.PLTHRUM as "Rel Position Um", a.PLTHRDIR as "Rel Position Dir",
     a.PLTHRCITY as "Rel Position City", a.PLTHRSTATE as "Rel Position State", a.PLTHRCUNTR as "Rel Position Country"
       from platsci.pltmhbdp a, maximum where plthloga = key and plthtruck = truck 
    `
);

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
export interface SQLTemplateOutputGETLATESTHB extends Array<SQLTemplateOutputRecord> {}
