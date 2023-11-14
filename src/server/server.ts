import Fastify, { FastifyReply } from 'fastify';
import { loadRoutes } from './routes.js';
import type { RequestFetchTodosByIds } from '../todos/infra/controllers/fetch-by-ids.controller.js';

export type Controllers = {
  fetchTodosByIds: (
    req: RequestFetchTodosByIds,
    reply: FastifyReply
  ) => Promise<void>;
};

interface Server {
  start: (host: string, port: number) => Promise<void>;
  close: () => Promise<void>;
}

export const serverFactory = (controllers: Controllers): Server => {
  const server = Fastify();
  loadRoutes(server, controllers);

  return {
    start: async (host: string, port: number) => {
      try {
        console.log(`starting server on ${host}:${port}`);
        await server.listen({ host: host, port: port });
      } catch (err) {
        server.log.error(err);
        process.exit(1);
      }
    },
    close: async () => {
      await server.close();
    },
  };
};
