import createLogger from 'src/services/logger';
import SQLTemplateKCPROWSO, { SQLTemplateOutputKCPROWSO } from 'src/models/keycap-kc-prowso';
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