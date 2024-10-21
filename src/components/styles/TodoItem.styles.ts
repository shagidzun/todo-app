import { Styles, Todo } from '../../types';

export const todoItemStyles = {
	container: {
		'&:hover .MuiToolbar-root': { opacity: 1 },
		minHeight: '56px',
		textAlign: 'left',
	},
	description: (todo: Todo) => ({
		textDecoration: todo.active ? 'none' : 'line-through',
		my: 'auto',
		wordBreak: 'break-all',
		opacity: todo.active ? 1 : 0.66,
	}),
	toolbar: {
		ml: 'auto',
		opacity: 0,
		gap: '4px',
	},
	btn: {
		minWidth: '12px',
	},
} satisfies Styles;
