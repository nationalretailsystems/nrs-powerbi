import { query } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const getViamundoWeight: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd'),
    query('building').isIn(['V','P','O','H','N','W']).exists().isAlpha().isUppercase().isLength({ min: 1, max: 1 }).withMessage('Building Must be 1 Character Uppercase Alpha')    
];
export const getCCRevenue: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd'),
    query('customer').optional().isNumeric().isLength({ min: 1, max: 5 }).withMessage('Customer Number Must be 1-5 Characters Numeric'),
    query('costcenter').exists().isAlphanumeric().isLength({ min: 3, max: 4 }).withMessage('Cost Center Must be 3-4 Characters Numeric')
        
];
export const getHours: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd'),
    query('costCenter').optional().isNumeric().isLength({ min: 3, max: 3 }).withMessage('Cost Center Must be 3 Characters Numeric')
];
export const getGL: InputCheckChain[] = [
    query('year').exists().isNumeric().isLength({ min: 4, max: 4 }).withMessage('Must be 4 numeric digits'),
    query('month').exists().isNumeric().isLength({ min: 2, max: 2 }).withMessage('Must be 2 numeric digits')

];

