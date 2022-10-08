'use strict';

const cors = require('@fastify/cors');
const fastify = require('fastify')({ logger: false });
fastify.register(cors, {});
const provideArguments = require('../../di');

module.exports = (routing, port, console) => {
    const entities = Object.keys(routing);
    for (const entity of entities) {
        const methods = Object.keys(routing[entity]);
        for (const method of methods) {
            const url = `/${entity}/${method}`;
            const options = { config: { rawBody: true }};
            const controller = async (request) => {
                console.log(`POST ${request.url} ${request.body}`);
                const body = JSON.parse(request.body);
                const handler = routing[entity][method];
                const result = await handler(...provideArguments(body, handler));
                return result.rows;
            };
            fastify.post(url, options, controller);
        }
    }
    fastify.listen({ port }, (err, address) => {
        if (err) console.log(err);
        else console.log(`Fastify HTTP server is listening on ${address}`);
    });
};
