import createLogger from 'src/services/logger';
import SQLTemplateKCPROWSO, { SQLTemplateOutputKCPROWSO } from 'src/models/keycap-kc-prowso';
import SQLTemplateKCPROWOSO, { SQLTemplateOutputKCPROWOSO } from 'src/models/keycap-kc-prowoso';
import SQLTemplateKCDUPINVPRO, { SQLTemplateOutputKCDUPINVPRO } from 'src/models/keycap-kc-dupinvpro';
import SQLTemplateKCDUPINVSCAC, { SQLTemplateOutputKCDUPINVSCAC } from 'src/models/keycap-kc-dupinvscac';
import SQLTemplateKCCARRIERS, { SQLTemplateOutputKCCARRIERS } from 'src/models/keycap-kc-carriers';
import SQLTemplateKCCHECKS, { SQLTemplateOutputKCCHECKS } from 'src/models/keycap-kc-checks';
import SQLTemplateKCVOIDS, { SQLTemplateOutputKCVOIDS } from 'src/models/keycap-kc-voids';
import SQLTemplateKCLATEORDERS, { SQLTemplateOutputKCLATEORDERS } from 'src/models/keycap-kc-lateorders';
import SQLTemplateKCYTDINV, { SQLTemplateOutputKCYTDINV } from 'src/models/keycap-kc-ytdinvoices';
import SQLTemplateKCMGNRTYTDINV, { SQLTemplateOutputKCMGNRTYTDINV } from 'src/models/keycap-kc-mgnrtytdinvoices';
import SQLTemplateKCALLSHIP, { SQLTemplateInputKCALLSHIP,SQLTemplateOutputKCALLSHIP } from 'src/models/keycap-kc-allshipments';
import { JSONObject } from 'src/types';
import { powerbiTransports } from 'src/services/connection';
import { DateTime } from 'luxon';
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
export async function getCarriers(): Promise<SQLTemplateOutputKCCARRIERS> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCCARRIERS) as Promise<SQLTemplateOutputKCCARRIERS>;
}
export async function getChecks(): Promise<SQLTemplateOutputKCCHECKS> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCCHECKS) as Promise<SQLTemplateOutputKCCHECKS>;
}
export async function getVoids(): Promise<SQLTemplateOutputKCVOIDS> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCVOIDS) as Promise<SQLTemplateOutputKCVOIDS>;
}
export async function getLateOrders(): Promise<SQLTemplateOutputKCLATEORDERS> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCLATEORDERS) as Promise<SQLTemplateOutputKCLATEORDERS>;
}
export async function getYtdInvoices(): Promise<SQLTemplateOutputKCYTDINV> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCYTDINV) as Promise<SQLTemplateOutputKCYTDINV>;
}
export async function getMgNrtYtdInvoices(): Promise<SQLTemplateOutputKCMGNRTYTDINV> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateKCMGNRTYTDINV) as Promise<SQLTemplateOutputKCMGNRTYTDINV>;
}
export async function getAllShipments(inputs: JSONObject): Promise<SQLTemplateOutputKCALLSHIP> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputKCALLSHIP = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };    
    return powerbiTransports.wolf.execute(SQLTemplateKCALLSHIP, params) as Promise<SQLTemplateOutputKCALLSHIP>;
}