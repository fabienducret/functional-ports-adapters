import { test } from '@japa/runner';
import { putSimulation } from '../api-simulation.js';
import { startDockerComposeWith } from '../docker-compose.js';
import type { StartedDockerComposeEnvironment } from 'testcontainers';

test.group('todos - fetch by ids - e2e', async (group) => {
  const todosApiUrl = 'http://fake-api:8500';
  const serverUrl = 'http://localhost:3000';
  let environment: StartedDockerComposeEnvironment;

  group.setup(async () => {
    environment = await startDockerComposeWith({ TODOS_API_URL: todosApiUrl });
    await putSimulation('todos/api/success.json');
  });

  group.teardown(async () => {
    if (environment) {
      environment.down();
    }
  });

  test('get todos with success', async ({ assert }) => {
    // Act
    const response = await fetch(`${serverUrl}/todos?ids=1,2`);

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
    const response = await fetch(`${serverUrl}/todos?ids=1,2,3`);

    // Assert
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), {
      message: `Error in fetch-by-id:\nerror in fetching ${todosApiUrl}/todos/3`,
    });
  });
});
