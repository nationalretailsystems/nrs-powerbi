import express, { Router } from 'express';
import mountAPI from './api';
import mountAuth from './auth';
import mountXAuth from './xauth';
import respond from 'src/middlewares/respond';

export default function addRoutes(router: Router) {
    const api = express.Router();
    const auth = express.Router();
    const xauth = express.Router();

    mountAPI(api);
    mountAuth(auth);
    mountXAuth(xauth);

    router.get(
        '/',
        respond(() => ({ message: 'Up and running!' }))
    );

    router.use('/api', api);
    router.use('/auth', auth);
    router.use('/xauth', xauth);
}
