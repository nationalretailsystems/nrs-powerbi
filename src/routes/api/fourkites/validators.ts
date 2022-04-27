import { body } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const loadCreation: InputCheckChain[] = [
    body('Errors').exists().isArray({max: 10}),
    body('Errors.*').isString().isLength({max: 50}),
    body('FourKitesLoadId').exists().isInt().isLength({max: 16}),
    body('IsSuccess').exists().isBoolean(),
    body('LoadNumber').exists().isString().isLength({max: 20}),
    body('MessageType').exists().isString().isLength({max: 20}),
    body('ProNumber').optional({nullable:true, checkFalsy: true}).exists().isString().isLength({max: 20}),
    body('ReferenceNumbers').exists().isArray({max: 10}),
    body('ReferenceNumbers.*').isString().isLength({max: 20}),
    body('Scac').exists().isString().isLength({max: 4}),
    body('Shipper').exists().isString().isLength({max: 30}),
    body('Tags').exists().isArray({max: 10}),
    body('Tags.*').isString().isLength({max: 25}),
    body('Timestamp').exists().isISO8601()
];
export const stopEtaUpdate: InputCheckChain[] = [
    body('ContainerType').exists().isString().isLength({max: 10}),
    body('FourKitesLoadId').exists().isInt().isLength({max: 16}),
    body('LoadNumber').exists().isString().isLength({max: 20}),
    body('MessageType').exists().isString().isLength({max: 20}),
    body('ProNumber').optional({nullable:true, checkFalsy: true}).exists().isString().isLength({max: 20}),
    body('ReferenceNumbers').exists().isArray({max: 10}), 
    body('ReferenceNumbers.*').isString().isLength({max: 20}),
    body('Scac').exists().isString().isLength({max: 4}),
    body('Shipper').exists().isString().isLength({max: 30}),
    body('StopName').exists().isString().isLength({max: 30}),
    body('StopReferenceId').exists().isString().isLength({max: 15}),
    body('StopSequence').exists().isInt().isLength({max: 7}),
    body('StopType').exists().isString().isLength({max: 20}),
    body('StopUnlocode').exists().isString().isLength({max: 10}),
    body('Tags').exists().isArray({max: 10}), 
    body('Tags.*').isString().isLength({max: 25}),
    body('Timestamp').exists().isISO8601(),
    body('VesselName').exists().isString().isLength({max: 25}),
    body('VoyageNumber').exists().isString().isLength({max: 20})
];
export const oceanUpdate: InputCheckChain[] = [
    body('FourKitesLoadId').exists().isInt().isLength({max: 16}),
    body('LoadNumber').exists().isString().isLength({max: 20}),
    body('Message').exists().isString().isLength({max: 100}),
    body('MessageType').exists().isString().isLength({max: 20}),
    body('ProNumber').optional({nullable:true, checkFalsy: true}).exists().isString().isLength({max: 20}),
    body('ReferenceNumbers').exists().isArray({max: 10}),
    body('ReferenceNumbers.*').isString().isLength({max: 20}),
    body('Scac').exists().isString().isLength({max: 4}),
    body('Shipper').exists().isString().isLength({max: 30}),
    body('Status').exists().isString().isLength({max: 30}),
    body('StatusCode').exists().isString().isLength({max: 5}),
    body('Tags').exists().isArray({max: 10}),
    body('Tags.*').isString().isLength({max: 25}),
    body('Timestamp').exists().isISO8601()
];
export const trackingUpdate: InputCheckChain[] = [
];
export const loadDeletion: InputCheckChain[] = [
];
export const locationUpdate: InputCheckChain[] = [
];
export const assetAssignment: InputCheckChain[] = [
];
export const stopArrival: InputCheckChain[] = [
];
export const stopDeparture: InputCheckChain[] = [
];

