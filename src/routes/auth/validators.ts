import { body } from 'express-validator';
import { InputCheckChain } from 'src/types';
import { regexService } from 'src/services/regexes-service';


export const login: InputCheckChain[] = [
        body('username').exists().isString(),
        body('password').exists().isString().matches(regexService().password)
]

