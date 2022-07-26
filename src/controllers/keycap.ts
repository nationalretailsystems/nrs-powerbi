import createLogger from 'src/services/logger';
import SQLTemplateKCPROWSO, { SQLTemplateOutputKCPROWSO } from 'src/models/keycap-kc-prowso';
import SQLTemplateKCPROWOSO, { SQLTemplateOutputKCPROWOSO } from 'src/models/keycap-kc-prowoso';
import SQLTemplateKCDUPINVPRO, { SQLTemplateOutputKCDUPINVPRO } from 'src/models/keycap-kc-dupinvpro';
import SQLTemplateKCDUPINVSCAC, { SQLTemplateOutputKCDUPINVSCAC } from 'src/models/keycap-kc-dupinvscac';
// import { JSONObject } from 'src/types';
import { powerbiTransports } from 'src/services/connection';
// import { DateTime } from 'luxon';
// import { promises as fs } from 'fs';
// import APIError from 'src/APIError';

const logger = createLogger('controllers/keycap');



export async function getKCProWSO(): Promise<SQLTemplateOutputKCPROWSO> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCPROWSO) as Promise<SQLTemplateOutputKCPROWSO>;
}
export async function getKCProWoSO(): Promise<SQLTemplateOutputKCPROWOSO> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCPROWOSO) as Promise<SQLTemplateOutputKCPROWOSO>;
}
export async function getKCDupInvPro(): Promise<SQLTemplateOutputKCDUPINVPRO> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCDUPINVPRO) as Promise<SQLTemplateOutputKCDUPINVPRO>;
}
export async function getKCDupInvScac(): Promise<SQLTemplateOutputKCDUPINVSCAC> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCDUPINVSCAC) as Promise<SQLTemplateOutputKCDUPINVSCAC>;
}