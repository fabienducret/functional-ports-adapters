import { test } from '@japa/runner';
import { inMemoryTodoRepository } from './in-memory.repository.js';

test.group('inMemoryTodoRepository', async () => {
  test('fetch a todo by id', async ({ assert }) => {
    // Act
    const todo = await inMemoryTodoRepository.fetchById('2');

    // Assert
    assert.deepEqual(todo.extract(), {
      id: 2,
      title: 'quis ut nam facilis et officia qui',
    });
  });

  test('get an error', async ({ assert }) => {
    // Act
    const err = await inMemoryTodoRepository.fetchById('3');

    // Assert
    assert.deepEqual(err.extract(), {
      message: 'error in fetching resource 3',
    });
  });
});
