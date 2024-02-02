import eradaniConnect from '@eradani-inc/eradani-connect';
// XXX import configService from 'config';
import { JSONObject } from 'src/types';
// XXX const config = configService.get().eradaniConnect.native;

export default new eradaniConnect.run.Sql(
    `with comment as (select orderoc, listagg(trim(commtoc),' \ ') as "Comments" from olfile5.ordc group by orderoc)  
    select DIV##T as "Division",  TRIP#T as "Trip#",
        TRIDTT as "TripDate",DATEET as "TripEndDate", 
        ORDEROR as "Order#", DRIV1T as "Driver",UNIT#T as "Unit",   
        TRAL1OR as "Trailer", TRALOOR as "OriginalTrailer",
        STRMIT as "Starting HubMiles (TRIP)", ENDMIT as "Ending Hub Miles (TRIP)",
        PCMHET as "PCMiler Hub Miles (TRIP)", USRHET as "User Hub Miles (TRIP)",
        MILESOR as "Contract Miles(ORDR)",  EMPTYOR as "Empty Miles (ORDR)",
        PCMILOR as "PC Miler Miles (ORDR)", "Comments"
        from olfile5.trip
    join olfile5.ordr on TRIP#T = TRIP#OR and DIV##T= DIV##OR
    join olfile5.driv on DRIV1T = EMPNODR
    left join comment on orderoc = orderor
    where tridtt between ? and ?`,
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

/**
 * Input Structure for SQLTemplate. Includes detailed field information such as
 * field length, format, numerical precision, and default values.
 */
export interface SQLTemplateInputTRIPS {
    /**
     * @description From Date
     */
    fromDate: number | string;
    /**
     * @description From Date
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
export interface SQLTemplateOutputTRIPS extends Array<SQLTemplateOutputRecord> {}
