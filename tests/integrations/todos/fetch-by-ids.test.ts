import { after, before, test } from 'node:test';
import * as assert from 'node:assert';
import { putSimulation } from '../api-simulation.js';
import { startDockerComposeWith } from '../docker-compose.js';
import type { StartedDockerComposeEnvironment } from 'testcontainers';

test('todos - fetch by ids - integration', async (t) => {
  const todosApiUrl = 'http://hoverfly:8500';
  let environment: StartedDockerComposeEnvironment;

  before(async () => {
    environment = await startDockerComposeWith({ TODOS_API: todosApiUrl });
    await putSimulation('todos/api/success.json');
  });

  after(async () => {
    environment.down();
  });

  await t.test('should return valid todos', async () => {
    // When
    const response = await fetch('http://localhost:3000/todos?ids=1,2');

    // Then
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

  await t.test('should return error for invalid resource', async () => {
    // When
    const response = await fetch('http://localhost:3000/todos?ids=1,2,3');

    // Then
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), {
      message: `Error in fetch-by-id:\nerror in fetching ${todosApiUrl}/todos/3`,
    });
  });
});
