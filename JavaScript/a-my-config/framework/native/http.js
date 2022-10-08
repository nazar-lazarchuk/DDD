'use strict';

const http = require('node:http');
const provideArguments = require('../../di');

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

module.exports = (routing, port, console) => {
  http.createServer(async (req, res) => {
    const { url, socket } = req;
    const [name, method] = url.substring(1).split('/');
    const entity = routing[name];
    if (!entity) return res.end('Not found');
    const handler = entity[method];
    if (!handler) return res.end('Not found');
    const body = await receiveArgs(req);
    console.log(`${socket.remoteAddress} ${method} ${url}`);
    const result = await handler(...provideArguments(body, handler));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end(JSON.stringify(result.rows));
  }).listen(port);

  console.log(`API on port ${port}`);
};
