import { body } from 'express-validator';
import { InputCheckChain } from 'src/types';

export const login: InputCheckChain[] = [
    body('clientid').exists().isString(),
    body('clientsecret').exists().isString()
];
