import { Todo } from '../types/types.ts';

export function findMaxId(todos: Todo[]) {
	let maxId = 0;
	todos.forEach((todo) => {
		if (todo.id > maxId) {
			maxId = todo.id;
		}
	});

	return maxId;
}
