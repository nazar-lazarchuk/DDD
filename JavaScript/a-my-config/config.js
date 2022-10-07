'use strict';

module.exports = {
    appPort: 8001,

    /** @type {'ws' | 'http'} */
    transport: 'http',

    staticPort: 8000,

    db: {
        host: '127.0.0.1',
        port: 5432,
        database: 'example',
        user: 'postgres',
        password: 'marcus',
    },
};
