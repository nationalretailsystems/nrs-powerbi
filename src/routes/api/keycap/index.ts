import { Router } from 'express';
import * as sqlController from 'src/controllers/keycap';
// import validate from 'src/middlewares/validate';
import respond from 'src/middlewares/respond';
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
}
