import config from 'config';
import eradaniConnect from '@eradani-inc/eradani-connect';
import _ from 'lodash/fp';
import createLogger from 'src/services/logger';
const logger = createLogger('eradani-inc/eradani-connect');

const transport = new eradaniConnect.transports.Odbc(config.ec.odbc, {
    ..._.cloneDeep(config.get('ec.odbcOptions')),
    logger
});

/* Disabled XML Transport
const credentials = config.ec.credentials;
const transport = new eradaniConnect.transports.Xml(
    '*LOCAL',
    credentials.username,
    credentials.password,
    { ...config.ec.xml, logger }
);
*/

export default transport;
