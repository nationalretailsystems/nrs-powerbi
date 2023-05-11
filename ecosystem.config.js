module.exports = {
    apps: [
        {
            name: 'eradani-inout-template',
            script: 'dist/src/app.js',

            // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            instances: '2',
            exec_mode: 'cluster',
            autorestart: true,
            restart_delay: 5000,
            env: {
                NODE_ENV: 'development'
            },
            env_test: {
                NODE_ENV: 'test'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
