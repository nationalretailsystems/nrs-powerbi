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
    router.get(
        '/ps-getonehb',
        validate(validators.getOneHB),
        respond((req: any) => sqlController.getOneHB(req.query))
    );
    router.get(
        '/ps-getlatesthb',
        respond(() => sqlController.getLatestHB())
    );
    router.get(
        '/psdrivperf',
        validate(validators.getDrivperf),
        respond((req: any) => sqlController.getDrivperf(req.query))
    );
    router.get(
        '/getskybitz',
        validate(validators.getSkybitz),
        respond((req: any) => sqlController.getSkybitz(req.query))
    );
    router.get(
        '/getdvirx',
        validate(validators.getDvir),
        respond((req: any) => sqlController.getDvir(req.query))
    );
    router.get('/getdvir', validate(validators.getDvir), async (req: any, res: any) => {
        await sqlController.getDvir(Object.assign({ res }, req.params, req.body, req.query));    
    });    
    router.get('/gethosmsgs', validate(validators.getHosMsgs), async (req: any, res: any) => {
        await sqlController.getHosMsgs2(Object.assign({ res }, req.params, req.body, req.query));
    });
    router.get('/gethosmsgs2', validate(validators.getHosMsgs2), async (req: any, res: any) => {
        await sqlController.getHosMsgs2(Object.assign({ res }, req.params, req.body, req.query));
    });
}
