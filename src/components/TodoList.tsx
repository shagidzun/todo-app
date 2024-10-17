import { Todo } from '../types/todo.ts';
import { Divider, Stack } from '@mui/material';
import { TodoItem } from './TodoItem.tsx';
import { Fragment } from 'react';

interface TodoListProps {
	todoList: Todo[];
}

export const TodoList = ({ todoList }: TodoListProps) => {
	return (
		<Stack>
			{todoList.map((todo) => (
				<Fragment key={todo.id}>
					<Divider />
					<TodoItem description={todo.description} active={todo.active} />
				</Fragment>
			))}
		</Stack>
	);
};
