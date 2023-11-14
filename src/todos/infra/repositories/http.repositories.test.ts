import { test } from '@japa/runner';
import { httpTodoRepository } from './http.repository.js';
import { Left, Right } from 'purify-ts';

export const fetcherInSuccess = async <T>() => {
  return Right({
    id: 2,
    title: 'quis ut nam facilis et officia qui',
  } as T);
};

export const fetcherInError = async () => {
  return Left('error in fetching resource 3');
};

test.group('httpTodoRepository', async () => {
  const apiUrl = 'https://url.com';

  test('fetch a todo by id', async ({ assert }) => {
    // Arrange
    const repo = httpTodoRepository(fetcherInSuccess, apiUrl);

    // Act
    const todo = await repo.fetchById('2');

    // Assert
    assert.deepEqual(todo.extract(), {
      id: 2,
      title: 'quis ut nam facilis et officia qui',
    });
  });

  test('get an error', async ({ assert }) => {
    // Arrange
    const repo = httpTodoRepository(fetcherInError, apiUrl);

    // Act
    const err = await repo.fetchById('3');

    // Assert
    assert.deepEqual(err.extract(), {
      message: 'error in fetching resource 3',
    });
  });
});
