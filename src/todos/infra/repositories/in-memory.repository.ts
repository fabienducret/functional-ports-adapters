import { Either, Left, Right } from 'purify-ts';
import type { Todo } from '../../domain/models/todo.js';
import type { Error } from '../../domain/models/error.js';
import type { TodoRepository } from '../../domain/ports/secondary.js';

const todos = [
  {
    id: 1,
    title: 'delectus aut autem',
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
  },
];

export const inMemoryTodoRepository: TodoRepository = {
  fetchById: async (id: string): Promise<Either<Error, Todo>> => {
    const todo = todos.find((t) => t.id === Number(id));

    if (!todo) {
      return Left({ message: `error in fetching resource ${id}` });
    }

    return Right(todo);
  },
};
