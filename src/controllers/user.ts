import * as jwt from 'src/services/jwt';
import config from 'config';
const credentials = config.credentials;
const dashboardCredentials = config.swagger.auth;
import eradaniConnect from '@eradani-inc/eradani-connect';
import transport from 'src/services/connection';
import APIError from 'src/api-error';
import { JWTUserData } from 'src/types';
import * as bcrypt from 'bcryptjs';
const saltRounds = 10;
const hashPassword = bcrypt.hashSync(dashboardCredentials.password, saltRounds);
const hashLoginPassword = bcrypt.hashSync(credentials.password, saltRounds);
import scmp from 'scmp';

export function login(clientId: string, clientSecret: string) {
    return new Promise(async (resolve, reject) => {
        const authSql = `select *
            from ${config.jwt.dataLib}.USERS
            where clientId = ?
        `;

        const authStmt = new eradaniConnect.run.Sql(authSql, { params: [{ name: 'clientId' }] });
        const authRslt: ArrayLike<any> = await (transport.execute(authStmt, {
            clientId: clientId
        }) as Promise<ArrayLike<any>>);

        if (authRslt.length != 1) {
            return reject(new APIError(401, 'Access Denied'));
        }

        const auth = authRslt[0];

        const subject = auth.CLIENTID;
        const scope = auth.SCOPE;

        if (bcrypt.compareSync(clientSecret, auth.CLIENTSECRET)) {
            const jwtDetails = await generateJWT({ subject, scope });
            resolve(jwtDetails);
        } else {
            reject(new APIError(401, 'Access Denied'));
        }
    });
}

export async function generateJWT(userData: JWTUserData) {
    const user = {
        subject: userData.subject,
        scope: userData.scope
    };

    return await jwt.sign(user);
}

export function dashboardLoginCredentialsCheck(req: object, username: any, password: any) {
    const swaggerUserName = dashboardCredentials.username;
    const passwordMatch = bcrypt.compareSync(password, hashPassword);
    if (req) {
        return scmp(Buffer.from(username), Buffer.from(swaggerUserName)) && passwordMatch;
    }
    return false;
}
