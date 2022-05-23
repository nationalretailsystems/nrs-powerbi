import * as jwt from 'src/services/jwt';
import config from 'config';
const credentials = config.credentials;
const dashboardCredentials = config.swagger.auth;
import APIError from 'src/APIError';
import { JWTUserData } from 'src/types';
import bcrypt from 'bcrypt';
const saltRounds = 10;
const hashPassword = bcrypt.hashSync(dashboardCredentials.password, saltRounds);
const hashLoginPassword = bcrypt.hashSync(credentials.password, saltRounds)

export function login(username: string, password: string) {
    return new Promise((resolve, reject) => {
        const passwordMatch = bcrypt.compareSync(password, hashLoginPassword);
        if (username === credentials.username && passwordMatch) {
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
        return { token };
    });
}

export function dashboardLoginCredentialsCheck(req: object, username: any, password: any) {
    const swaggerUserName = dashboardCredentials.username;
    const passwordMatch = bcrypt.compareSync(password, hashPassword);
    if (req) return username === swaggerUserName && passwordMatch;
    return false;
}
