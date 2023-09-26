import { query } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const getHeartBeats: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yymmdd'),
    query('unit').optional().isAlphanumeric().isUppercase().isLength({ min: 1, max: 6 }).withMessage('Unit must be 1 to 6 characters, alphanumeric uppercase'),
    query('unit').default('000000'),
    query('unit2').optional().isAlphanumeric().isUppercase().isLength({ min: 1, max: 6 }).withMessage('Unit must be 1 to 6 characters, alphanumeric uppercase'),
    query('unit2').customSanitizer(value => 'unit2')
];
