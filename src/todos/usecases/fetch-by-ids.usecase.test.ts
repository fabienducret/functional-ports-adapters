import { test } from 'node:test';
import * as assert from 'node:assert';
import { inMemoryTodoRepository } from '../repositories/in-memory.repository.js';
import { fetchTodosByIdsUseCase } from './fetch-by-ids.usecase.js';

test('fetch-by-ids', async (t) => {
  const todosByIds = fetchTodosByIdsUseCase(inMemoryTodoRepository);

  await t.test('should return valid todos', async () => {
    // When
    const todos = await todosByIds(['1', '2']);

    //Then
    assert.deepEqual(todos.extract(), [
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
    ]);
  });

  await t.test('should return error message for invalid resource', async () => {
    // When
    const error = await todosByIds(['1', '3', '4']);

    //Then
    assert.deepEqual(error.extract(), {
      message:
        'Error in fetch-by-id:\nerror in fetching resource 3\nerror in fetching resource 4',
    });
  });
});
