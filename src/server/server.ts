import Fastify from 'fastify';
import { loadGetTodosRoutesFor } from '../todos/infra/routes/get-todos.routes.js';
import type { Config } from './config.js';

export const startServer = async (config: Config) => {
  const server = Fastify();
  loadGetTodosRoutesFor(server, config);

  try {
    console.log(`starting server on ${config.host}:${config.port}`);
    await server.listen({ host: config.host, port: config.port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
