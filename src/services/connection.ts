import config from 'config';
import eradaniConnect from '@eradani-inc/eradani-connect';
import _ from 'lodash/fp';
import createLogger from 'src/services/logger';
const logger = createLogger('eradani-inc/eradani-connect');

const odbcTransport = new eradaniConnect.transports.Odbc(config.ec.odbc, {
    ..._.cloneDeep(config.get('ec.odbcOptions')),
    logger
});

const credentials = config.ec.ecConnectorCredentials;
export const xmlTransport = new eradaniConnect.transports.Xml('*LOCAL', credentials.username, credentials.password, {
    ...config.ec.xml,
    logger
});

let idbTransport;
try {
    idbTransport = new eradaniConnect.transports.Idb(config.idb);
} catch (e) {
    logger.warn('Idb transport initialization failed. Idb is not available off of IBM i', e);
    idbTransport = odbcTransport;
}
export { idbTransport };

// Default transport is ODBC-based
export default odbcTransport;
