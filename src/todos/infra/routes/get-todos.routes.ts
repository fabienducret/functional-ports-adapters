import { withLogging } from '../../../lib/with-logging.js';
import { fetchTodosByIdsUseCase } from '../../domain/usecases/fetch-by-ids.usecase.js';
import { httpTodoRepository } from '../repositories/http.repository.js';
import { fetchTodosByIdsController } from '../controllers/fetch-by-ids.controller.js';
import { fetcher } from '../../../lib/fetch.js';
import type { FastifyInstance } from 'fastify';
import type { Config } from '../../../server/config.js';

export const loadGetTodosRoutesFor = (
  server: FastifyInstance,
  config: Config
) => {
  const todosByIds = withLogging(
    fetchTodosByIdsUseCase(httpTodoRepository(fetcher, config.todosApiUrl))
  );
  server.get('/todos', fetchTodosByIdsController(todosByIds));
};
