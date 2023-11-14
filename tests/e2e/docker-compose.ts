import { DockerComposeEnvironment } from 'testcontainers';
import type { Environment } from 'testcontainers/build/types.js';

export const startDockerComposeWith = (environment: Environment) => {
  return new DockerComposeEnvironment('./', [
    'docker-compose.yaml',
    'docker-compose-test.yaml',
  ])
    .withEnvironment(environment)
    .up();
};
