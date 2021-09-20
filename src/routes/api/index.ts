import express, { Router } from 'express';
import respond from 'src/middlewares/respond';
import mountRPG from './rpg';
import mountSQL from './sql';

export default function mountAPI(router: Router) {
    // You can set auth requirements on a whole API section by putting `router.use(requireAuth);` here instead of on individual route definitions

    const rpg = express.Router();
    mountRPG(rpg);
    router.use('/rpg', rpg);

    const sql = express.Router();
    mountSQL(sql);
    router.use('/sql', sql);

    router.get(
        '/',
        respond(() => ({ message: 'Up and running!' }))
    );
}
