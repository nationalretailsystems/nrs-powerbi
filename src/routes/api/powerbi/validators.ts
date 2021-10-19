import { query } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const getViamundoWeight: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd'),
    query('building').isIn(['V','P','O','H','N','W']).exists().isAlpha().isUppercase().isLength({ min: 1, max: 1 }).withMessage('Building Must be 1 Character Uppercase Alpha')    
];
