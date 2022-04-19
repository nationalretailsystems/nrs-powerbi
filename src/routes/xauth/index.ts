import { Router } from 'express';
import validate from 'src/middlewares/validate';
import respond from 'src/middlewares/respond';
import requireAuth from 'src/middlewares/require-auth';
import * as validators from './validators';
import * as user from 'src/controllers/fkuser';


export default function mountAuth(router: Router) {
    router.post(
        '/',
        validate(validators.xauth),
        respond((req: any) => user.login(req.body.client_id, req.body.client_secret))
    );

    router.post(
        '/verify-jwt',
        requireAuth,
        respond(() => ({ valid: true }))
    );
}
