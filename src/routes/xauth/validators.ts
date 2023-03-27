import { body } from 'express-validator';
import { InputCheckChain } from 'src/types';
import { regexes } from 'src/services/regexes';

export const xauth: InputCheckChain[] = [
        body('client_id').exists().isString(),
        body('client_secret').exists().isString().matches(regexes.password)
]

