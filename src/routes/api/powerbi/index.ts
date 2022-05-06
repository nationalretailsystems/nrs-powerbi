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
    router.get(
        '/sales',
        validate(validators.getSales),
        respond((req: any) => sqlController.getSales(req.query))
    );
    router.get(
        '/blhd-to-ar',
        validate(validators.getBlhd2Ar),
        respond((req: any) => sqlController.getBlhd2Ar(req.query))
    );    
    router.get(
        '/blhd-to-arky',
        validate(validators.getBlhd2ArKy),
        respond((req: any) => sqlController.getBlhd2ArKy(req.query))
    ); 
    router.get(
        '/recpt-analysis',
        validate(validators.getRecpt),
        respond((req: any) => sqlController.getRecpt(req.query))
    ); 
    router.get(
        '/manifest-analysis',
        validate(validators.getManif),
        respond((req: any) => sqlController.getManif(req.query))
    ); 
    router.get(
        '/blex',
        // validate(validators.getBlex),
        respond(() => sqlController.getBlex())
    ); 
    router.get(
        '/blpr',
        // validate(validators.getBlpr),
        respond(() => sqlController.getBlpr())
    ); 
    router.get(
        '/blsj',
        // validate(validators.getBlsj),
        respond(() => sqlController.getBlsj())
    ); 
    router.get(
        '/ar-balance',
        respond(() => sqlController.getARBalance())
    ); 
    router.get(
        '/pro-details',
        validate(validators.getProDetails),
        respond((req: any) => sqlController.getProDetails(req.query))
    );     
    router.get(
        '/billing-detail',
        validate(validators.getBillDetail),
        respond((req: any) => sqlController.getBillDetail(req.query))
    ); 
    router.get(
        '/blhd-act',
        validate(validators.getBlhdAct),
        respond((req: any) => sqlController.getBlhdAct(req.query))
    );
    router.get(
        '/blhd-cons',
        respond(() => sqlController.getBlhdCons())
    ); 
    router.get(
        '/blhd-olfile5',
        validate(validators.getBlhdOlfile5),
        respond((req: any) => sqlController.getBlhdOlfile5(req.query))
    ); 
    router.get(
        '/blhd-originh',
        validate(validators.getBlhdOriginh),
        respond((req: any) => sqlController.getBlhdOriginh(req.query))
    );                
}