import { body } from 'express-validator';
import { InputCheckChain } from 'src/types';
import { regexes } from 'src/services/regexes';


export const login: InputCheckChain[] = [
    body('clientid').exists().isString(),
    body('clientsecret').exists().isString()
];
