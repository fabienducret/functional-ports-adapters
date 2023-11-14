import { test } from '@japa/runner';
import { inMemoryTodoRepository } from '../../infra/repositories/in-memory.repository.js';
import { fetchTodosByIdsUseCase } from './fetch-by-ids.usecase.js';

test.group('fetch-by-ids', async () => {
  const todosByIds = fetchTodosByIdsUseCase(inMemoryTodoRepository);

  test('fetch todos by ids', async ({ assert }) => {
    // Act
    const todos = await todosByIds(['1', '2']);

    // Assert
    assert.deepEqual(todos.extract(), [
      {
        id: 1,
        title: 'delectus aut autem',
      },
      {
        id: 2,
        title: 'quis ut nam facilis et officia qui',
      },
    ]);
  });

  test('get an error message for invalid resource', async ({ assert }) => {
    // Act
    const error = await todosByIds(['1', '3', '4']);

    // Assert
    assert.deepEqual(error.extract(), {
      message:
        'Error in fetch-by-id:\nerror in fetching resource 3\nerror in fetching resource 4',
    });
  });
});
