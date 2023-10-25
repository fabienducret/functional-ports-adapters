import { FastifyReply, FastifyRequest } from 'fastify';
import type { Error } from '../../domain/models/error.js';
import type { FetchTodosByIds } from '../../domain/ports/primary.js';

type Request = FastifyRequest<{
  Querystring: { ids?: string };
}>;

const idsFrom = (request: Request): string[] | undefined =>
  request.query.ids?.split(',');

const replyWithError = (reply: FastifyReply, e: Error): void => {
  reply.status(500);
  reply.send(e);
};

export const fetchTodosByIdsController = (fetchTodosByIds: FetchTodosByIds) => {
  return async (req: Request, reply: FastifyReply) => {
    const ids = idsFrom(req) ?? [];
    const errOrTodos = await fetchTodosByIds(ids);

    errOrTodos
      .ifLeft((e) => replyWithError(reply, e))
      .map((todos) => {
        const toReply = todos.map((t) => ({ id: t.id, title: t.title }));
        reply.send({ todos: toReply });
      });
  };
};
