import ECCRouter from '@eradani-inc/ecc-router';
import { OutboundMetricsInstance } from '@eradani-inc/ec-metrics';
import registerJokes from './jokes';
import registerTraffic from './traffic';
import registerVehicle from './vehicle';
import registerWeather from './weather';
import registerShipping from './shipping';
import config from 'src/config';
let outboundMetrics = config?.metrics?.outbound || false;

export default async function registerCommands(router: ECCRouter) {
    if (outboundMetrics) {
        router.use(OutboundMetricsInstance.countCommandCalls);
    }

    const jokes = new ECCRouter.Router();
    registerJokes(jokes);
    router.use('jokes', jokes);

    const traffic = new ECCRouter.Router();
    registerTraffic(traffic);
    router.use('traffic', traffic);

    const vehicle = new ECCRouter.Router();
    registerVehicle(vehicle);
    router.use('vehicle', vehicle);

    const weather = new ECCRouter.Router();
    registerWeather(weather);
    router.use('weather', weather);

    const shipping = new ECCRouter.Router();
    registerShipping(shipping);
    router.use('shipping', shipping);

    if (outboundMetrics) {
        router.use(OutboundMetricsInstance.afterCommandParams);
    }

    return router;
}
