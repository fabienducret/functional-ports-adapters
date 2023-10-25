import { fetchTodosByIdsUseCase } from '../../domain/usecases/fetch-by-ids.usecase.js';
import { fetchTodosByIdsController } from '../controllers/fetch-by-ids.controller.js';
import { httpTodoRepository } from '../repositories/http.repository.js';
import { fetcher } from '../../../lib/fetch.js';
import { withLogging } from '../../../lib/with-logging.js';
import type { FastifyInstance } from 'fastify';
import type { Config } from '../../../server/config.js';

export const loadFetchTodosByIdsRoute = (
  server: FastifyInstance,
  config: Config
) => {
  const todoRepo = httpTodoRepository(fetcher, config.todosApiUrl);
  const fetchTodosByIds = withLogging(fetchTodosByIdsUseCase(todoRepo));

  server.get('/todos', fetchTodosByIdsController(fetchTodosByIds));
};
