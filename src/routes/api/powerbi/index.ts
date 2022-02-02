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
    router.get(
        '/Hours',
        validate(validators.getHours),
        respond((req: any) => sqlController.getHours(req.query))
    );
    router.get(
        '/getGL',
        validate(validators.getGL),
        respond((req: any) => sqlController.getGL(req.query))
    );
    router.get(
        '/WMS378',
        validate(validators.getWMS378),
        respond((req: any) => sqlController.getWMS378(req.query))
    );    
}
