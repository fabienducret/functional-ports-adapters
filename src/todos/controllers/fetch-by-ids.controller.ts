import { FastifyReply, FastifyRequest } from 'fastify';
import { Error } from '../../models/error.js';
import { Todo } from '../../models/todo.js';
import { Either } from 'purify-ts';

type Request = FastifyRequest<{
  Querystring: { ids?: string };
}>;

interface FetchTodosByIds {
  (ids: string[]): Promise<Either<Error, Todo[]>>;
}

const idsFrom = (request: Request): string[] | undefined =>
  request.query.ids?.split(',');

const replyWithError = (reply: FastifyReply, e: Error): void => {
  reply.status(500);
  reply.send(e);
};

const replyWithTodos = (reply: FastifyReply, t: Todo[]): void => {
  reply.send({ todos: t });
};

export const fetchTodosByIdsController = (fetchTodosByIds: FetchTodosByIds) => {
  return async (req: Request, reply: FastifyReply) => {
    const ids = idsFrom(req) ?? [];
    const errOrTodos = await fetchTodosByIds(ids);

    errOrTodos
      .ifLeft((e) => replyWithError(reply, e))
      .map((t) => replyWithTodos(reply, t));
  };
};
