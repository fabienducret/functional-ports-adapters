import { Either, Left, Right } from 'purify-ts/Either';
import type { Error } from '../models/error.js';
import type { Todo } from '../models/todo.js';

interface TodoRepository {
  fetchById(id: string): Promise<Either<Error, Todo>>;
}

const hasErrors = (todos: Either<Error, Todo>[]): boolean => {
  return Either.lefts(todos).length > 0;
};

const formatErrorMessage = (todos: Either<Error, Todo>[]) => {
  const errors = Either.lefts(todos)
    .map((t) => t.message)
    .join('\n');

  return `Error in fetch-by-id:\n${errors}`;
};

export const fetchTodosByIdsUseCase = (repo: TodoRepository) => {
  const fetch = async (ids: string[]) => {
    const requests = ids.map(repo.fetchById);
    return Promise.all(requests);
  };

  return async (ids: string[]): Promise<Either<Error, Todo[]>> => {
    const errOrTodos = await fetch(ids);

    if (hasErrors(errOrTodos)) {
      return Left({ message: formatErrorMessage(errOrTodos) });
    }

    return Right(Either.rights(errOrTodos));
  };
};
