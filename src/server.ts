import Fastify, { FastifyInstance } from 'fastify';
import { fetchTodosByIdsController } from './todos/controllers/fetch-by-ids.controller.js';
import { withLogging } from './lib/with-logging.js';
import { fetchTodosByIdsUseCase } from './todos/usecases/fetch-by-ids.usecase.js';
import { httpTodoRepository } from './todos/repositories/http.repository.js';

const loadRoutesForTodos = (fastify: FastifyInstance) => {
  const todosByIds = withLogging(fetchTodosByIdsUseCase(httpTodoRepository));
  fastify.get('/todos', fetchTodosByIdsController(todosByIds));
};

export const startServer = async () => {
  const fastify = Fastify();

  loadRoutesForTodos(fastify);

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
