import { query } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const getYard: InputCheckChain[] = [
    query('fromYard').exists().isLength({ min: 2, max: 2 }).isIn(['SA','NB']).withMessage('Invalid Yard SA or NB')
];
