import { Either, Left, Right } from 'purify-ts';
import type { Todo } from '../../models/todo.js';
import type { Error } from '../../models/error.js';

const todos = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
];

export const inMemoryTodoRepository = {
  async fetchById(id: string): Promise<Either<Error, Todo>> {
    const todo = todos.find((t) => t.id === Number(id));

    if (!todo) {
      return Left({ message: `error in fetching resource ${id}` });
    }

    return Right(todo);
  },
};
