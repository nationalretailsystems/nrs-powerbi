import createLogger from 'src/services/logger';
import { FKLOADCREAModel, FKLOADCREAInput, FKLOADCREAOutput } from 'src/models/fkloadcrea';
import { FKSTOPETAModel, FKSTOPETAInput, FKSTOPETAOutput } from 'src/models/fkstopeta';
import { FKOCEANUPDModel, FKOCEANUPDInput, FKOCEANUPDOutput } from 'src/models/fkoceanupd';
import transport from 'src/services/connection';

const logger = createLogger('controllers/fourkites');

/**
 * Run the Template program.
 *
 * @param {number} num The number to input to the program
 * @returns {Promise<FKLOADCREAOutput}
 */
export async function loadCreation(load: FKLOADCREAInput): Promise<FKLOADCREAOutput> {
    logger.debug('Calling FKLOADCREA program');

    return transport.execute(FKLOADCREAModel, load) as Promise<FKLOADCREAOutput>;
}

export async function stopEtaUpdate(load: FKSTOPETAInput): Promise<FKSTOPETAOutput> {
    logger.debug('Calling FKSTOPETA program');

    return transport.execute(FKSTOPETAModel, load) as Promise<FKSTOPETAOutput>;
}

export async function oceanUpdate(load: FKOCEANUPDInput): Promise<FKOCEANUPDOutput> {
    logger.debug('Calling FKOCEANUPDATE program');

    return transport.execute(FKOCEANUPDModel, load) as Promise<FKOCEANUPDOutput>;
}
