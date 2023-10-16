import type { Todo } from '../../models/todo.js';

export const consolePresenter = (todos: Todo[]) => {
  todos.forEach((t) => {
    console.log(`${t.id} - ${t.title}`);
  });
};
