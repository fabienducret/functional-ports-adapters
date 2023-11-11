import { test } from 'node:test';
import * as assert from 'node:assert';
import { inMemoryTodoRepository } from './in-memory.repository.js';

test('inMemoryTodoRepository', async (t) => {
  await t.test('fetch a todo by id', async () => {
    // Act
    const todo = await inMemoryTodoRepository.fetchById('2');

    // Assert
    assert.deepEqual(todo.extract(), {
      id: 2,
      title: 'quis ut nam facilis et officia qui',
    });
  });

  await t.test('get an error', async () => {
    // Act
    const err = await inMemoryTodoRepository.fetchById('3');

    // Assert
    assert.deepEqual(err.extract(), {
      message: 'error in fetching resource 3',
    });
  });
});
