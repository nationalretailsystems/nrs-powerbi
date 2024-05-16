import { query } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const getHeartBeats: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('unit').optional().isAlphanumeric().isUppercase().isLength({ min: 1, max: 6 }).withMessage('Unit must be 1 to 6 characters, alphanumeric uppercase'),
    query('unit').default('000000'),
    query('unit2').optional().isAlphanumeric().isUppercase().isLength({ min: 1, max: 6 }).withMessage('Unit must be 1 to 6 characters, alphanumeric uppercase'),
    // X query('unit2').customSanitizer(value => 'unit2'),
    query('type').optional().isIn(['IG','ALL']).isAlpha().isUppercase().isLength({ min:2, max:3}).withMessage('Type must be IG for Ignition or ALL'),
    query('type2').optional()
];
export const getOneHB: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd')
];
export const getDrivperf: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),    
];
export const getSkybitz: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd')
];
export const getHosMsgs: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('logType').isIn(['HE','HT','HA']).exists().isAlpha().isUppercase().isLength({ min: 2, max: 4 }).withMessage('App Type must be HE, HA or HT-Use getHosMsgs2 for HP')
];
export const getHosMsgs2: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('logType').isIn(['HP']).exists().isAlpha().isUppercase().isLength({ min: 2, max: 4 }).withMessage('App Type must be HP Only')
];
export const getDvir: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),    
];
