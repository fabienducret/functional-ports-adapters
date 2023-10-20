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
  await t.test('should return valid todo', async () => {
    // Given
    const repo = httpTodoRepository(fetcherInSuccess, 'https://url.com');

    // When
    const todo = await repo.fetchById('2');

    // Then
    assert.deepEqual(todo.extract(), {
      id: 2,
      title: 'quis ut nam facilis et officia qui',
    });
  });

  await t.test('should return error', async () => {
    // Given
    const repo = httpTodoRepository(fetcherInError, 'https://url.com');

    // When
    const err = await repo.fetchById('3');

    // Then
    assert.deepEqual(err.extract(), {
      message: 'error in fetching resource 3',
    });
  });
});
