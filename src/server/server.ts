import Fastify, { FastifyReply } from 'fastify';
import { RequestFetchTodosByIds } from '../todos/infra/controllers/fetch-by-ids.controller.js';

export type Controllers = {
  fetchTodosByIds: (
    req: RequestFetchTodosByIds,
    reply: FastifyReply
  ) => Promise<void>;
};

export const initServerWith = (controllers: Controllers) => {
  return async (host: string, port: number) => {
    const server = Fastify();

    server.get('/todos', controllers.fetchTodosByIds);

    try {
      console.log(`starting server on ${host}:${port}`);
      await server.listen({ host: host, port: port });
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };
};
