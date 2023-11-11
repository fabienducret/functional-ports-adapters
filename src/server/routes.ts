import { FastifyInstance } from 'fastify';
import { Controllers } from './server.js';

export const loadRoutes = (
  server: FastifyInstance,
  controllers: Controllers
): void => {
  server.get('/todos', controllers.fetchTodosByIds);
};
