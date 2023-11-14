import { test } from '@japa/runner';
import { serverFactory } from './server.js';
import { fetchTodosByIdsController } from '../todos/infra/controllers/fetch-by-ids.controller.js';
import { fetchTodosByIdsUseCase } from '../todos/domain/usecases/fetch-by-ids.usecase.js';
import { inMemoryTodoRepository } from '../todos/infra/repositories/in-memory.repository.js';

test.group('server - fetch by ids', async (group) => {
  const fetchTodosByIds = fetchTodosByIdsUseCase(inMemoryTodoRepository);
  const server = serverFactory({
    fetchTodosByIds: fetchTodosByIdsController(fetchTodosByIds),
  });

  group.setup(async () => {
    await server.start('localhost', 3000);
  });

  group.teardown(async () => {
    server.close();
  });

  test('reply with status 200 and todos', async ({ assert }) => {
    const reply = await fetch('http://localhost:3000/todos?ids=1,2');
    const todos = await reply.json();

    assert.equal(reply.status, 200);
    assert.deepEqual(todos, {
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

  test('reply with status 500 and error', async ({ assert }) => {
    const reply = await fetch('http://localhost:3000/todos?ids=3');
    const err = await reply.json();

    assert.equal(reply.status, 500);
    assert.deepEqual(err, {
      message: 'Error in fetch-by-id:\nerror in fetching resource 3',
    });
  });
});
