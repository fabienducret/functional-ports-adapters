import { fetcher } from './lib/fetch.js';
import { withLogging } from './lib/with-logging.js';
import { Config, initConfig } from './config/config.js';
import { Controllers, initServerWith } from './server/server.js';
import { fetchTodosByIdsUseCase } from './todos/domain/usecases/fetch-by-ids.usecase.js';
import { fetchTodosByIdsController } from './todos/infra/controllers/fetch-by-ids.controller.js';
import { httpTodoRepository } from './todos/infra/repositories/http.repository.js';

const handleError = (err: Error) => {
  console.error(err);
  process.exit(1);
};

const controllers = (config: Config): Controllers => {
  const todoRepo = httpTodoRepository(fetcher, config.todosApiUrl);
  const fetchTodosByIds = withLogging(fetchTodosByIdsUseCase(todoRepo));

  return {
    fetchTodosByIds: fetchTodosByIdsController(fetchTodosByIds),
  };
};

const main = async () => {
  initConfig()
    .ifLeft(handleError)
    .map((c: Config) => {
      const startServer = initServerWith(controllers(c));
      startServer(c.host, c.port);
    });
};

main();
