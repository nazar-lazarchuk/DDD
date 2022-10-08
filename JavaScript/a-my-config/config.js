'use strict';

module.exports = {
    static: {
        port: 8000,
        dir: './static',
    },

    api: {
        port: 8001,

        /** @type {'native' | 'fastify'} */
        framework: 'fastify',

        /** @type {'ws' | 'http'} */
        transport: 'http',
    },

    sandbox: {
        timeout: 5000,
        displayErrors: false,
    },

    db: {
        host: '127.0.0.1',
        port: 5432,
        database: 'example',
        user: 'postgres',
        password: 'marcus',
    },
};
