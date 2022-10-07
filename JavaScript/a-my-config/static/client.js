'use strict';

// const wsUrl = 'ws://127.0.0.1:8001/';
// const socket = new WebSocket(wsUrl);
const ws = () => (name, method, params) => (...args) => {
  return new Promise((resolve) => {
    const packet = { name, method, args };
    socket.send(JSON.stringify(packet));
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      resolve(data);
    };
  });
};

const http = (url) => (name, method, params) => async (...args) => {
  const entries = params.map((key, index) => [key, args[index]]);
  const data = Object.fromEntries(entries);
  const options = { method: 'POST', body: JSON.stringify(data) };
  const response = await fetch(`${url}${name}/${method}`, options);
  return response.json();
};

const scaffold = (url, structure) => {
  const api = {};
  const services = Object.keys(structure);
  const transports = { http, ws };
  const protocol = url.substring(0, url.indexOf('://'));
  const handler = transports[protocol](url);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      const params = service[methodName];
      api[serviceName][methodName] = handler(serviceName, methodName, params);
    }
  }
  return api;
};

const api = scaffold('http://127.0.0.1:8001/', {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
  country: {
    read: ['id'],
    delete: ['id'],
    find: ['mask'],
  },
});

// socket.addEventListener('open', async () => {
//   const data = await api.user.read(3);
//   console.dir({ data });
// });
api.user.read(3).then(data => console.log(data));
