import express, { Router } from 'express';
import mountRPG from './rpg';
import mountSQL from './sql';
import mountPOWERBI from './powerbi';

export default function mountAPI(router: Router) {
    // You can set auth requirements on a whole API section by putting `router.use(requireAuth);` here instead of on individual route definitions

    const rpg = express.Router();
    mountRPG(rpg);
    router.use('/rpg', rpg);

    const sql = express.Router();
    mountSQL(sql);
    router.use('/sql', sql);

    const powerbi = express.Router();
    mountPOWERBI(powerbi);
    router.use('/powerbi', powerbi)
}
