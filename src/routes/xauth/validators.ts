import { body } from 'express-validator';
import { InputCheckChain } from 'src/types';
import { regexService } from 'src/services/regexes-service';

export const xauth: InputCheckChain[] = [
        body('client_id').exists().isString(),
        body('client_secret').exists().isString().matches(regexService().password)
]

