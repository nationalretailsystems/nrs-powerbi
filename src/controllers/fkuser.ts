import * as jwt from 'src/services/jwt';
import config from 'config';
const credentials = config.credentials;
import APIError from 'src/api-error';
import { JWTUserData } from 'src/types';
import eradaniConnect from '@eradani-inc/eradani-connect';
import transport from 'src/services/connection';
import bcrypt from 'bcryptjs';

export async function login(clientId: string, clientSecret: string) {
    const authSql = `select *
        from ${config.jwt.dataLib}.USERS
        where clientId = ?
    `;

    const authStmt = new eradaniConnect.run.Sql(authSql, { params: [{ name: 'clientId' }] });
    const authRslt: ArrayLike<any> = await (transport.execute(authStmt, {
        clientId: clientId
    }) as Promise<ArrayLike<any>>);

    if (authRslt.length !== 1) {
        throw new APIError(401, 'Access Denied');
    }

    const auth = authRslt[0];

    const subject = auth.CLIENTID;
    const scope = auth.SCOPE;

    if (await bcrypt.compare(clientSecret, auth.CLIENTSECRET)) {
        const jwtDetails = await generateJWT({ subject, scope });
        return jwtDetails;
    } else {
        throw new APIError(401, 'Access Denied');
    }
}

export async function generateJWT(userData: JWTUserData) {
    const user = {
        subject: userData.subject,
        scope: userData.scope
    };

    return jwt.sign(user);
}
