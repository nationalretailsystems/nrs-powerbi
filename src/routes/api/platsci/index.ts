import { Router } from 'express';
import * as sqlController from 'src/controllers/platsci';
import validate from 'src/middlewares/validate';
import respond from 'src/middlewares/respond';
import * as validators from './validators';
/* eslint-disable-next-line */
// import * as validators from './validators';

// You can set login requirements on an API endpoint by putting `requireAuth` after the URL specification
export default function mountPLATSCI(router: Router) {
    router.get(
        '/ps-heartbeats',
        validate(validators.getHeartBeats),
        respond((req: any) => sqlController.getHeartBeats(req.query))
    );
}
