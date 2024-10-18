import { filterTodos } from './filterTodos.ts';
import { mockActiveTodos, mockAllTodos, mockCompletedTodos } from '../mocks';

it('should return all todos', () => {
	expect(filterTodos(mockAllTodos, 'all')).toHaveLength(mockAllTodos.length);
});

it('should return active todos', () => {
	const filteredTodos = filterTodos(mockAllTodos, 'active');
	expect(filteredTodos.every((todo) => todo.active)).toBe(true);
	expect(filteredTodos).toHaveLength(mockActiveTodos.length);
});

it('should return completed todos', () => {
	const filteredTodos = filterTodos(mockAllTodos, 'completed');
	expect(filteredTodos.every((todo) => !todo.active)).toBe(true);
	expect(filteredTodos).toHaveLength(mockCompletedTodos.length);
});
