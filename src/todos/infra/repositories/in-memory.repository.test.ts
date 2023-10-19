import { test } from 'node:test';
import * as assert from 'node:assert';
import { inMemoryTodoRepository } from './in-memory.repository.js';

test('inMemoryTodoRepository', async (t) => {
  await t.test('should return valid todo', async () => {
    const todo = await inMemoryTodoRepository.fetchById('2');

    assert.deepEqual(todo.extract(), {
      id: 2,
      title: 'quis ut nam facilis et officia qui',
    });
  });

  await t.test('should return error', async () => {
    const err = await inMemoryTodoRepository.fetchById('3');

    assert.deepEqual(err.extract(), {
      message: 'error in fetching resource 3',
    });
  });
});
