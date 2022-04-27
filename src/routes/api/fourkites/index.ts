import { Router } from 'express';
import * as fourKitesController from 'src/controllers/fourkites';
import validate from 'src/middlewares/validate';
import respond from 'src/middlewares/respond';
import * as validators from './validators';
import requireAuth from 'src/middlewares/require-auth';

// You can set login requirements on an API endpoint by putting `requireAuth` after the URL specification
export default function mountFourKites(router: Router) {
    router.use(requireAuth);

    router.post(
        '/load-creation',
        validate(validators.loadCreation),
        respond((req: any) => fourKitesController.loadCreation(req.body))
    );
    router.post(
        '/stop-eta-update',
        validate(validators.stopEtaUpdate),
        respond((req: any) => fourKitesController.stopEtaUpdate(req.body))
    );
    router.post(
        '/ocean-update',
        validate(validators.oceanUpdate),
        respond((req: any) => fourKitesController.oceanUpdate(req.body))
    );
    router.post(
        '/tracking-update',
        validate(validators.trackingUpdate),
        respond((req: any) => fourKitesController.trackingUpdate(req.body))
    );
    router.post(
        '/load-deletion',
        validate(validators.loadDeletion),
        respond((req: any) => fourKitesController.loadDeletion(req.body))
    );
    router.post(
        '/location-update',
        validate(validators.locationUpdate),
        respond((req: any) => fourKitesController.locationUpdate(req.body))
    );
    router.post(
        '/asset-assignment',
        validate(validators.assetAssignment),
        respond((req: any) => fourKitesController.assetAssignment(req.body))
    );
    router.post(
        '/stop-arrival',
        validate(validators.stopArrival),
        respond((req: any) => fourKitesController.stopArrival(req.body))
    );
    router.post(
        '/stop-departure',
        validate(validators.stopDeparture),
        respond((req: any) => fourKitesController.stopDeparture(req.body))
    );
}
