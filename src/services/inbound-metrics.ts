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

    static getPromClient() {
        return swStats.getPromClient();
    }

    static getMetricsAsArray() {
        return swStats.getPromClient().register.getMetricsAsArray();
    }

    static getPromStats() {
        return swStats.getPromStats();
    }

    static async getMetricsAsJSON() {
        return swStats.getPromClient().register.getMetricsAsJSON();
    }
}

export default InboundMetrics;
