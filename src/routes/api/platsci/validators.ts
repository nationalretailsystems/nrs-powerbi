import { query } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const getHeartBeats: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('unit').exists().isAlphanumeric().isUppercase().isLength({ min: 1, max: 6 }).withMessage('Unit must be 1 to 6 characters, alphanumeric uppercase')    
];
