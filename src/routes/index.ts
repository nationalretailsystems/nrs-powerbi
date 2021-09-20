import express, { Router } from 'express';
import mountAPI from './api';
import mountAuth from './auth';

export default function addRoutes(router: Router) {
    const api = express.Router();
    const auth = express.Router();

    mountAPI(api);
    mountAuth(auth);

    router.use('/api', api);
    router.use('/auth', auth);
}
