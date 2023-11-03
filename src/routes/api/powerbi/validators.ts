import { query } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const getViamundoWeight: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('building').isIn(['V','P','O','H','N','W']).exists().isAlpha().isUppercase().isLength({ min: 1, max: 1 }).withMessage('Building Must be 1 Character Uppercase Alpha')    
];
export const getCCRevenue: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('customer').optional().isNumeric().isLength({ min: 1, max: 5 }).withMessage('Customer Number Must be 1-5 Characters Numeric'),
    query('costcenter').optional().isAlphanumeric().isLength({ min: 3, max: 4 }).withMessage('Cost Center Must be 3-4 Characters')
        
];
export const getHours: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('costCenter').optional().isNumeric().isLength({ min: 3, max: 3 }).withMessage('Cost Center Must be 3 Characters Numeric')
];
export const getGL: InputCheckChain[] = [
    query('year').exists().isNumeric().isLength({ min: 4, max: 4 }).withMessage('Must be 4 numeric digits'),
    query('month').exists().isNumeric().isLength({ min: 2, max: 2 }).withMessage('Must be 2 numeric digits')

];
export const getWMS378: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),

];
export const getSales: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getSalesPro: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getSalesProDsc: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getBlhd2Ar: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getBlhd2ArKy: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getRecpt: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getManif: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getProDetails: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getBillDetail: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getBlhdAct: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getBlhdOlfile5: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getBlhdOriginh: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getBlhdQuery: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getLtlWeight: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getManf: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getTlWeight: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getOrdr: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getDisp: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getDispDt: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getDispatch: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getDriver: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getKronos: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getLtlManifest: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getSupermilesConsignee: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getSupermilesShp: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getPort80Kronos: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getPort80Pros: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getContainers: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getWeights: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('building').exists().isAlpha().isIn(['S','R','V','P','O','H','N','W']).isLength({ min: 1, max: 1 }).withMessage('Must 1 character V N W H O R P S'),
];
export const getSACtDt: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getSAObScans: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getSAHdPo: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getSATJOnDock: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
];
export const getControlListing: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 8, max: 8 }).withMessage('Must be date yyyymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 8, max: 8 }).withMessage('Must be date yyyymmdd'),    
];
export const getOl736Data: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),    
];
export const getFed46r: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),    
];
export const getTrips: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),    
];
