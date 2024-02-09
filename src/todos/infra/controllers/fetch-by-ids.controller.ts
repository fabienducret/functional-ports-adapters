import { FastifyReply, FastifyRequest } from 'fastify';
import type { Error } from '../../domain/models/error.js';
import type { FetchTodosByIds } from '../../domain/ports/primary.js';

export type RequestFetchTodosByIds = FastifyRequest<{
  Querystring: { ids?: string };
}>;

const idsFrom = (req: RequestFetchTodosByIds): string[] =>
  req.query.ids?.split(',') ?? [];

const replyWithError = (reply: FastifyReply, e: Error): void => {
  reply.status(500);
  reply.send(e);
};

export const fetchTodosByIdsController = (fetchTodosByIds: FetchTodosByIds) => {
  return async (req: RequestFetchTodosByIds, reply: FastifyReply) => {
    const ids = idsFrom(req);
    const errOrTodos = await fetchTodosByIds(ids);

    errOrTodos
      .mapLeft((e) => replyWithError(reply, e))
      .map((todos) => {
        const toReply = todos.map((t) => ({ id: t.id, title: t.title }));
        reply.send({ todos: toReply });
      });
  };
};
