import { body } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const login: InputCheckChain[] = [
    body('username').exists().isString(),
    body('password').exists().isString().isLength({ min: 8 })
];
