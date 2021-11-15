import config from 'config';
import eradaniConnect from '@eradani-inc/eradani-connect';
import _ from 'lodash/fp';
import createLogger from 'src/services/logger';
const logger = createLogger('eradani-inc/eradani-connect');

const transport = new eradaniConnect.transports.Odbc(config.eradaniConnect.odbc, {
    ..._.cloneDeep(config.eradaniConnect.odbcOptions),
    logger
});
export const transport2 = new eradaniConnect.transports.Odbc(config.eradaniConnect.odbc2, {
    ...config.eradaniConnect.odbcOptions,
    logger
});

/* Disabled XML Transport
const credentials = config.eradaniConnect.credentials;
const transport = new eradaniConnect.transports.Xml(
    '*LOCAL',
    credentials.username,
    credentials.password,
    { ...config.eradaniConnect.xml, logger }
);
*/

// X export default transport;
export default transport;
