import createLogger from 'src/services/logger';
import { FKLOADCREAModel, FKLOADCREAInput, FKLOADCREAOutput } from 'src/models/fkloadcrea';
import { FKSTOPETAModel, FKSTOPETAInput, FKSTOPETAOutput } from 'src/models/fkstopeta';
import { FKOCEANUPDModel, FKOCEANUPDInput, FKOCEANUPDOutput } from 'src/models/fkoceanupd';
import { FKTRACKUPDModel, FKTRACKUPDInput, FKTRACKUPDOutput } from 'src/models/fktrackupd';
import { FKLOADDELEModel, FKLOADDELEInput, FKLOADDELEOutput } from 'src/models/fkloaddele';
import { FKLOCATUPDModel, FKLOCATUPDInput, FKLOCATUPDOutput } from 'src/models/fklocatupd';
import { FKASSETASSModel, FKASSETASSInput, FKASSETASSOutput } from 'src/models/fkassetass';
import { FKSTPARRIVModel, FKSTPARRIVInput, FKSTPARRIVOutput } from 'src/models/fkstparriv';
import { FKSTPDEPARModel, FKSTPDEPARInput, FKSTPDEPAROutput } from 'src/models/fkstpdepar';
import transport from 'src/services/connection';
import APIError from 'src/APIError';

const logger = createLogger('controllers/fourkites');

/**
 * Run the Template program.
 *
 * @param {number} num The number to input to the program
 * @returns {Promise<FKLOADCREAOutput}
 */
export async function loadCreation(load: FKLOADCREAInput) {
    logger.debug('Calling FKLOADCREA program');

    const loadCreResult = (await transport.execute(FKLOADCREAModel, load)) as FKLOADCREAOutput;
    if (loadCreResult.FourKitesLoadId === 0) {
        throw new APIError(450, 'Bad Load ID');
    }

    //    return transport.execute(FKLOADCREAModel, load) as Promise<FKLOADCREAOutput>;
}

export async function stopEtaUpdate(load: FKSTOPETAInput): Promise<FKSTOPETAOutput> {
    logger.debug('Calling FKSTOPETA program');

    return transport.execute(FKSTOPETAModel, load) as Promise<FKSTOPETAOutput>;
}

export async function oceanUpdate(load: FKOCEANUPDInput): Promise<FKOCEANUPDOutput> {
    logger.debug('Calling FKOCEANUPDATE program');

    return transport.execute(FKOCEANUPDModel, load) as Promise<FKOCEANUPDOutput>;
}

export async function trackingUpdate(load: FKTRACKUPDInput): Promise<FKTRACKUPDOutput> {
    logger.debug('Calling FKTRACKUPDATE program');

    return transport.execute(FKTRACKUPDModel, load) as Promise<FKTRACKUPDOutput>;
}

export async function loadDeletion(load: FKLOADDELEInput): Promise<FKLOADDELEOutput> {
    logger.debug('Calling FKLOADDELTION program');

    return transport.execute(FKLOADDELEModel, load) as Promise<FKLOADDELEOutput>;
}

export async function locationUpdate(load: FKLOCATUPDInput): Promise<FKLOCATUPDOutput> {
    logger.debug('Calling FKLOCATUPDATE program');

    return transport.execute(FKLOCATUPDModel, load) as Promise<FKLOCATUPDOutput>;
}

export async function assetAssignment(load: FKASSETASSInput): Promise<FKASSETASSOutput> {
    logger.debug('Calling FKASSETASSIGNMENT program');

    return transport.execute(FKASSETASSModel, load) as Promise<FKASSETASSOutput>;
}

export async function stopArrival(load: FKSTPARRIVInput): Promise<FKSTPARRIVOutput> {
    logger.debug('Calling FKSTPARRIVIVAL program');

    return transport.execute(FKSTPARRIVModel, load) as Promise<FKSTPARRIVOutput>;
}

export async function stopDeparture(load: FKSTPDEPARInput): Promise<FKSTPDEPAROutput> {
    logger.debug('Calling FKSTPDEPARTURE program');

    return transport.execute(FKSTPDEPARModel, load) as Promise<FKSTPDEPAROutput>;
}
