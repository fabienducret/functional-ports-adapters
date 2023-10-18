import type { FastifyInstance } from 'fastify';
import { withLogging } from '../../../lib/with-logging.js';
import { fetchTodosByIdsUseCase } from '../../domain/usecases/fetch-by-ids.usecase.js';
import { httpTodoRepository } from '../repositories/http.repository.js';
import { fetchTodosByIdsController } from '../controllers/fetch-by-ids.controller.js';

export const loadGetTodosRoutesFor = (server: FastifyInstance) => {
  const todosByIds = withLogging(fetchTodosByIdsUseCase(httpTodoRepository));
  server.get('/todos', fetchTodosByIdsController(todosByIds));
};
