import { Either } from 'purify-ts';
import { fetchFrom } from '../../../lib/fetch.js';
import type { Todo } from '../../domain/models/todo.js';
import type { Error } from '../../domain/models/error.js';

type RawTodo = {
  id: number;
  title: string;
};

const parse = (from: RawTodo): Todo => {
  return {
    id: from.id,
    title: from.title,
  };
};

export const httpTodoRepository = {
  async fetchById(id: string): Promise<Either<Error, Todo>> {
    const baseUrl = process.env.TODOS_API;
    const rawTodo = await fetchFrom<RawTodo>(`${baseUrl}/todos/${id}`);

    return rawTodo.map(parse);
  },
};
