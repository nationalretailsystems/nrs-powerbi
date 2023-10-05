import swStats from 'swagger-stats';
import * as uuid from 'uuid';

export class InboundMetrics {
    constructor() {
        swStats.getPromClient().register.setDefaultLabels({
            app: 'eradani-connect',
            type: 'inbound',
            uuid: uuid.v4()
        });
    }

    public getPromClient() {
        return swStats.getPromClient();
    }

    public getMetricsAsArray() {
        return swStats.getPromClient().register.getMetricsAsArray();
    }

    public getPromStats() {
        return swStats.getPromStats();
    }

    public async getMetricsAsJSON() {
        return swStats.getPromClient().register.getMetricsAsJSON();
    }
}

const inbounddMetricsIns = new InboundMetrics();

export { inbounddMetricsIns };
