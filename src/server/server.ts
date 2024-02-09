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
  run: (host: string, port: number) => Promise<string>;
  close: () => Promise<void>;
}

export const createServerWith = (controllers: Controllers): Server => {
  const server = Fastify();
  loadRoutes(server, controllers);

  return {
    run: async (host: string, port: number): Promise<string> => {
      console.log(`starting server on ${host}:${port}`);
      return server.listen({ host: host, port: port });
    },
    close: async (): Promise<void> => {
      await server.close();
    },
  };
};
