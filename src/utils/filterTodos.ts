import { Filter, Todo } from '../types';

export function filterTodos(todos: Todo[], filter: Filter) {
	switch (filter) {
		case 'all':
			return todos;
		case 'active':
			return todos.filter((todo) => todo.active);
		case 'completed':
			return todos.filter((todo) => !todo.active);
	}
}
