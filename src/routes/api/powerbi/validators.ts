import { query } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const getViamundoWeight: InputCheckChain[] = [
    query('fromDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd'),
    query('toDate').exists().isNumeric().isLength({ min: 6, max: 6 }).withMessage('Must be date yyyymmdd')
];
