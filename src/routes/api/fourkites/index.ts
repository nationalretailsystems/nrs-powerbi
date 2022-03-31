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
}
