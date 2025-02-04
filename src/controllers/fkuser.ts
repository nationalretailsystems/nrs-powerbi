import * as jwt from 'src/services/jwt';
import config from 'config';
const credentials = config.credentials;
import APIError from 'src/APIError';
import { JWTUserData } from 'src/types';

export function login(username: string, password: string) {
    return new Promise((resolve, reject) => {
        if (username === credentials.username && password === credentials.password) {
            resolve(generateJWT({ username }));
        } else {
            reject(new APIError(400, 'Username / Password Combination Not Found'));
        }
    });
}

export function generateJWT(userData: JWTUserData) {
    const user = {
        username: userData.username
    };

    return jwt.sign(user).then((token: string) => {
        /* eslint-disable-next-line */
        return { access_token: token };
    });
}
