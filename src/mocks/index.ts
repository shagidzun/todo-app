import { Todo } from '../types';

export const mockActiveTodos = [
	{
		id: 0,
		description: 'Todo0',
		active: true,
	},
	{
		id: 8,
		description: 'Todo2',
		active: true,
	},
	{
		id: 41,
		description: 'Todo4',
		active: true,
	},
	{
		id: 1,
		description: 'Todo5',
		active: true,
	},
];

export const mockCompletedTodos: Todo[] = [
	{
		id: 3,
		description: 'Todo1',
		active: false,
	},

	{
		id: 12,
		description: 'Todo3',
		active: false,
	},

	{
		id: 4,
		description: 'Todo6',
		active: false,
	},
];

export const mockAllTodos = mockActiveTodos.concat(mockCompletedTodos);
