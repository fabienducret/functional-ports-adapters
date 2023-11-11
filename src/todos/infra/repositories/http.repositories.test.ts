import { test } from 'node:test';
import * as assert from 'node:assert';
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

test('httpTodoRepository', async (t) => {
  await t.test('fetch a todo by id', async () => {
    // Arrange
    const repo = httpTodoRepository(fetcherInSuccess, 'https://url.com');

    // Act
    const todo = await repo.fetchById('2');

    // Assert
    assert.deepEqual(todo.extract(), {
      id: 2,
      title: 'quis ut nam facilis et officia qui',
    });
  });

  await t.test('get an error', async () => {
    // Arrange
    const repo = httpTodoRepository(fetcherInError, 'https://url.com');

    // Act
    const err = await repo.fetchById('3');

    // Assert
    assert.deepEqual(err.extract(), {
      message: 'error in fetching resource 3',
    });
  });
});
