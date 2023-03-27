import { body } from 'express-validator';
import { InputCheckChain } from 'src/types';
import { regexes } from 'src/services/regexes';


export const login: InputCheckChain[] = [
        body('username').exists().isString(),
        body('password').exists().isString().matches(regexes.password)
]

