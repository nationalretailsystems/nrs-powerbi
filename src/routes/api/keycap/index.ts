import { Router } from 'express';
import * as sqlController from 'src/controllers/keycap';
import validate from 'src/middlewares/validate';
import respond from 'src/middlewares/respond';
import * as validators from './validators';

// import * as validators from './validators';

// You can set login requirements on an API endpoint by putting `requireAuth` after the URL specification
export default function mountKEYCAP(router: Router) {

    router.get(
        '/kc-prowso',
        respond(() => sqlController.getKCProWSO())
    );
    router.get(
        '/kc-prowoso',
        respond(() => sqlController.getKCProWoSO())
    );
    router.get(
        '/kc-dupinvpro',
        respond(() => sqlController.getKCDupInvPro())
    );
    router.get(
        '/kc-dupinvscac',
        respond(() => sqlController.getKCDupInvScac())
    );
    router.get(
        '/kc-carriers',
        respond(() => sqlController.getCarriers())
    );
    router.get(
        '/kc-checkpayments',
        respond(() => sqlController.getChecks())
    );
    router.get(
        '/kc-checkvoids',
        respond(() => sqlController.getVoids())
    );
    router.get(
        '/kc-orderlatereasons',
        respond(() => sqlController.getLateOrders())
    );
    router.get(
        '/kc-invoicesytd',
        respond(() => sqlController.getYtdInvoices())
    );
    router.get(
        '/kc-mgnrtinvoicesytd',
        respond(() => sqlController.getMgNrtYtdInvoices())
    );
    router.get(
        '/kc-allshipments',
        validate(validators.getAllShipments),        
        respond((req: any) => sqlController.getAllShipments(req.query))
    );    
}
