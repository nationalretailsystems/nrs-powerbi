import { ECCInternalRouter } from '@eradani-inc/ecc-router/ecc-router';
import { getJoke } from './controller';
import * as icndbapi from 'src/interfaces/icndbapi';
import * as Prometheus from 'src/services/outbound-metrics';

export default function registerJokes(router: ECCInternalRouter) {
    router.add(Prometheus.countCommandCalls);
    router.add(Prometheus.countCommandErrors);
    router.use('getjoke', icndbapi, getJoke);
}
