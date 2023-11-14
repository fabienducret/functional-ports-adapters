import { test } from '@japa/runner';
import { serverFactory } from '../../../src/server/server.js';
import { fetchTodosByIdsController } from '../../../src/todos/infra/controllers/fetch-by-ids.controller.js';
import { fetchTodosByIdsUseCase } from '../../../src/todos/domain/usecases/fetch-by-ids.usecase.js';
import { inMemoryTodoRepository } from '../../../src/todos/infra/repositories/in-memory.repository.js';

const initServer = () => {
  const fetchTodosByIds = fetchTodosByIdsUseCase(inMemoryTodoRepository);

  return serverFactory({
    fetchTodosByIds: fetchTodosByIdsController(fetchTodosByIds),
  });
};

test.group('todos - fetch by ids - integration', async (group) => {
  const host = 'localhost';
  const port = 3000;
  const server = initServer();

  group.setup(async () => {
    await server.start(host, port);
  });

  group.teardown(async () => {
    await server.close();
  });

  test('get todos with success', async ({ assert }) => {
    // Act
    const response = await fetch(`http://${host}:${port}/todos?ids=1,2`);

    // Assert
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      todos: [
        {
          id: 1,
          title: 'delectus aut autem',
        },
        {
          id: 2,
          title: 'quis ut nam facilis et officia qui',
        },
      ],
    });
  });

  test('get error for invalid resource', async ({ assert }) => {
    // Act
    const response = await fetch(`http://${host}:${port}/todos?ids=1,2,3`);

    // Assert
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), {
      message: `Error in fetch-by-id:\nerror in fetching resource 3`,
    });
  });
});
