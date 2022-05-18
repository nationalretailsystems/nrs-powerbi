import { body } from 'express-validator';
import configService from 'config';
import { InputCheckChain } from 'src/types';
const regexes = configService.get().regexes;

export const xauth: InputCheckChain[] = [
        body('client_id').exists().isString(),
        body('client_secret').exists().isString().matches(regexes.password)
]

