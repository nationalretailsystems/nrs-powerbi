import createLogger from 'src/services/logger';
const logger = createLogger('middlewares/require-scope');

export default function requireScope(scopes: string[]) {
    return function (req: any, res: any, next: any) {
        /* 
         * Process scopes based on the `scopes` variable in here
         * Ensure that all of the scopes listed in the scopes parameter
         * to the requireScope middleware are present in the user's scopes.
         * It is OK if the user has additional scopes beyond what is
         * required for this API.
         * If the user has the required scopes, call next()
         */

        try {
            const userScopes = req.user.scope.split(' ');

            let okay = true;
            scopes.forEach((scope) => {
                if (userScopes.indexOf(scope) < 0) {
                    okay = false;
                }
            });

            if (okay) {
                return next();
            }

            return res.status(403).send({
                message: 'Access Denied'
            });
        } catch (e) {
            logger.verbose('Require Scope Failed', e);
            return res.status(403).send({
                message: 'Access Denied'
            });
        }
    };
}
