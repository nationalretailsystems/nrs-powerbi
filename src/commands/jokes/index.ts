import { ECCInternalRouter } from '@eradani-inc/ecc-router/ecc-router';
import { getJoke } from './controller';
import * as icndbapi from 'src/interfaces/icndbapi';
import * as Prometheus from 'src/services/outbound-metrics';

export default function registerJokes(router: ECCInternalRouter) {
    router.use(Prometheus.countCommandCalls);
    router.use('getjoke', icndbapi, getJoke);
    router.use(Prometheus.endTimer);
    router.use(Prometheus.commandDetails);
    router.use(Prometheus.countCommandErrors);
}
