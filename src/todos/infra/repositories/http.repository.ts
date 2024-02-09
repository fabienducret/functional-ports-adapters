import { Either } from 'purify-ts';
import type { Todo } from '../../domain/models/todo.js';
import type { Error } from '../../domain/models/error.js';
import type { TodoRepository } from '../../domain/ports/secondary.js';

interface Fetcher {
  <T>(url: string): Promise<Either<string, T>>;
}

type RawTodo = {
  id: number;
  title: string;
};

const parseError = (from: string): Error => {
  return { message: from };
};

const parseTodo = (from: RawTodo): Todo => {
  return {
    id: from.id,
    title: from.title,
  };
};

export const httpTodoRepository = (
  fetcher: Fetcher,
  apiUrl?: string
): TodoRepository => {
  return {
    fetchById: async (id: string): Promise<Either<Error, Todo>> => {
      const rawTodo = await fetcher<RawTodo>(`${apiUrl}/todos/${id}`);

      return rawTodo.mapLeft(parseError).map(parseTodo);
    },
  };
};
