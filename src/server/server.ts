import Fastify from 'fastify';
import { loadGetTodosRoutesFor } from '../todos/infra/routes/get-todos.routes.js';

type Config = {
  host?: string;
  port?: number;
};

const createServer = () => {
  const server = Fastify();

  loadGetTodosRoutesFor(server);

  return server;
};

export const startServerWith = async (config: Config) => {
  const server = createServer();

  try {
    console.log(`starting server on ${config.host}:${config.port}`);
    await server.listen({ host: config.host, port: config.port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
