import { Router } from 'express';
import * as sqlController from 'src/controllers/powerbi';
import validate from 'src/middlewares/validate';
import respond from 'src/middlewares/respond';
import * as validators from './validators';

// You can set login requirements on an API endpoint by putting `requireAuth` after the URL specification
export default function mountPOWERBI(router: Router) {
    router.get(
        '/weight',
        validate(validators.getViamundoWeight),
        respond((req: any) => sqlController.getViamundoWeight(req.query))
    );
    router.get(
        '/CCRevenue',
        validate(validators.getCCRevenue),
        respond((req: any) => sqlController.getCCRevenue(req.query))
        );
}

