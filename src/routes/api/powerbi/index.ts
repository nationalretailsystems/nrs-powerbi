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
        '/sales-pro',
        validate(validators.getSalesPro),
        respond((req: any) => sqlController.getSalesPro(req.query))
    );
    router.get(
        '/sales-pro-dsc',
        validate(validators.getSalesProDsc),
        respond((req: any) => sqlController.getSalesProDsc(req.query))
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
        /* eslint-disable-next-line */
        // validate(validators.getBlex),
        respond(() => sqlController.getBlex())
    );
    router.get(
        '/blpr',
        /* eslint-disable-next-line */
        // validate(validators.getBlpr),
        respond(() => sqlController.getBlpr())
    );
    router.get(
        '/blsj',
        /* eslint-disable-next-line */
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
    router.get(
        '/blhd-query',
        validate(validators.getBlhdQuery),
        respond((req: any) => sqlController.getBlhdQuery(req.query))
    );
    router.get(
        '/ltl-weight',
        validate(validators.getLtlWeight),
        respond((req: any) => sqlController.getLtlWeight(req.query))
    );
    router.get(
        '/cust',
        respond(() => sqlController.getCust())
    );
    router.get(
        '/manf',
        validate(validators.getManf),
        respond((req: any) => sqlController.getLtlWeight(req.query))
    );
    router.get(
        '/tl-weight',
        validate(validators.getTlWeight),
        respond((req: any) => sqlController.getTlWeight(req.query))
    );
    router.get(
        '/move',
        respond(() => sqlController.getMove())
    );
    router.get(
        '/move-number',
        respond(() => sqlController.getMoveNumber())
    );
    router.get(
        '/ordr',
        validate(validators.getManf),
        respond((req: any) => sqlController.getOrdr(req.query))
    );
    router.get(
        '/disp',
        validate(validators.getDisp),
        respond((req: any) => sqlController.getDisp(req.query))
    );
    router.get(
        '/disp-dt',
        validate(validators.getDispDt),
        respond((req: any) => sqlController.getDispDt(req.query))
    );
    router.get(
        '/dispatch',
        validate(validators.getDispatch),
        respond((req: any) => sqlController.getDispatch(req.query))
    );
    router.get(
        '/driver',
        validate(validators.getDriver),
        respond((req: any) => sqlController.getDriver(req.query))
    );
    router.get(
        '/kronos-hours',
        validate(validators.getKronos),
        respond((req: any) => sqlController.getKronos(req.query))
    );
    router.get(
        '/ltl-manifest-blhd-revenue',
        validate(validators.getLtlManifest),
        respond((req: any) => sqlController.getLtlManifest(req.query))
    );
    router.get(
        '/supermiles-consignee',
        validate(validators.getSupermilesConsignee),
        respond((req: any) => sqlController.getSupermilesConsignee(req.query))
    );
    router.get(
        '/supermiles-shp',
        validate(validators.getSupermilesShp),
        respond((req: any) => sqlController.getSupermilesShp(req.query))
    );
    router.get(
        '/port80-containers',
        respond(() => sqlController.getPort80Containers())
    );
    router.get(
        '/port80-kronos-hours',
        validate(validators.getPort80Kronos),
        respond((req: any) => sqlController.getPort80Kronos(req.query))
    );
    router.get(
        '/port80-pros',
        validate(validators.getPort80Pros),
        respond((req: any) => sqlController.getPort80Pros(req.query))
    );
    router.get(
        '/port80-turns-nrt2port',
        respond(() => sqlController.getPort80Nrt2Port())
    );
    router.get(
        '/port80-turns-port2nrt',
        respond(() => sqlController.getPort80Port2Nrt())
    );
    router.get(
        '/containers',
        validate(validators.getContainers),
        respond((req: any) => sqlController.getPort80Pros(req.query))
    );
    router.get(
        '/weights',
        validate(validators.getWeights),
        respond((req: any) => sqlController.getWeights(req.query))
    );
    router.get(
        '/locations',
        respond(() => sqlController.getLocations())
    );
    router.get(
        '/sa-rls-inq',
        respond(() => sqlController.getSARlsInq())
    );
    router.get(
        '/sa-hd-ld-vur',
        respond(() => sqlController.getSAHdLdVur())
    );
    router.get(
        '/sa-ct-dt',
        validate(validators.getSACtDt),
        respond((req: any) => sqlController.getSACtDT(req.query))
    );
    router.get(
        '/sa-yd3-inq',
        respond(() => sqlController.getSAYd3Inq())
    );
    router.get(
        '/sa-ob-scans',
        validate(validators.getSAObScans),
        respond((req: any) => sqlController.getSAObScans(req.query))
    );
    router.get(
        '/sa-hd-po',
        validate(validators.getSAHdPo),
        respond((req: any) => sqlController.getSAHdPo(req.query))
    );
    router.get(
        '/sa-tj-ondock',
        validate(validators.getSATJOnDock),
        respond((req: any) => sqlController.getSATJOnDock(req.query))
    );
    router.get(
        '/sa-ob-atdoor',
        respond((req: any) => sqlController.getSAOBatDoor())
    );
    router.get(
        '/sa-andrea-rpt',
        respond((req: any) => sqlController.getSAAndreaRpt())
    );
    router.get(
        '/control-listing',
        validate(validators.getControlListing),
        respond((req: any) => sqlController.getControlListing(req.query))
    );        
}
