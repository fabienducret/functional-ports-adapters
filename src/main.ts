import { fetcher } from './lib/fetch.js';
import { withLogging } from './lib/with-logging.js';
import { Config, initConfig } from './config/config.js';
import { Controllers, serverFactory } from './server/server.js';
import { fetchTodosByIdsUseCase } from './todos/domain/usecases/fetch-by-ids.usecase.js';
import { fetchTodosByIdsController } from './todos/infra/controllers/fetch-by-ids.controller.js';
import { httpTodoRepository } from './todos/infra/repositories/http.repository.js';

const controllers = (config: Config): Controllers => {
  const todoRepo = httpTodoRepository(fetcher, config.todosApiUrl);
  const fetchTodosByIds = withLogging(fetchTodosByIdsUseCase(todoRepo));

  return {
    fetchTodosByIds: fetchTodosByIdsController(fetchTodosByIds),
  };
};

const handleError = (e: Error) => {
  console.error(e);
  process.exit(1);
};

const startServer = (c: Config) => {
  const server = serverFactory(controllers(c));
  server.start(c.host, c.port);
};

const main = async () => {
  initConfig().ifLeft(handleError).map(startServer);
};

main();
