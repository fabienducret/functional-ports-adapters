import { httpTodoRepository } from './todos/repositories/http.repository.js';
import { fetchTodosByIdsFactory } from './todos/usecases/fetch-by-ids.js';
import { consolePresenter } from './todos/presenters/console.presenter.js';
import { withLogging } from './lib/with-logging.js';

const main = async () => {
  const todosByIds = fetchTodosByIdsFactory(httpTodoRepository);
  const todosByIdsWithLogging = withLogging(todosByIds);
  const errOrTodos = await todosByIdsWithLogging([1, 2, 3, 5]);

  errOrTodos.ifLeft(console.error).map(consolePresenter);
};

main();
