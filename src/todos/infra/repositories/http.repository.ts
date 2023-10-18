import { Either } from 'purify-ts';
import { fetchFrom } from '../../../lib/fetch.js';
import type { Todo } from '../../domain/models/todo.js';
import type { Error } from '../../domain/models/error.js';

const baseUrl = 'https://jsonplaceholder.typicode.com';

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
    const rawTodo = await fetchFrom<RawTodo>(`${baseUrl}/todos/${id}`);
    console.log(`${baseUrl}/todos/${id}`);
    return rawTodo.map(parse);
  },
};
