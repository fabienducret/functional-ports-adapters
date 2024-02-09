import { fetcher } from './lib/fetch.js';
import { withLogging } from './lib/with-logging.js';
import { Config, initConfig } from './config/config.js';
import { Controllers, createServerWith } from './server/server.js';
import { fetchTodosByIdsUseCase } from './todos/domain/usecases/fetch-by-ids.usecase.js';
import { fetchTodosByIdsController } from './todos/infra/controllers/fetch-by-ids.controller.js';
import { httpTodoRepository } from './todos/infra/repositories/http.repository.js';

const controllers = (c: Config): Controllers => {
  const todoRepo = httpTodoRepository(fetcher, c.todosApiUrl);
  const fetchTodosByIds = withLogging(fetchTodosByIdsUseCase(todoRepo));

  return {
    fetchTodosByIds: fetchTodosByIdsController(fetchTodosByIds),
  };
};

const handleError = (e: Error) => {
  console.error(e);
  process.exit(1);
};

const runServer = (c: Config) => {
  const server = createServerWith(controllers(c));
  server.run(c.host, c.port).catch(handleError);
};

const main = async () => {
  initConfig().map(runServer).mapLeft(handleError);
};

main();
