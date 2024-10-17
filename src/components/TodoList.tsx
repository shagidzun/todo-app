import { Types } from '../types/types.ts';
import { Divider, Stack } from '@mui/material';
import { TodoItem } from './TodoItem.tsx';
import { Fragment } from 'react';

interface TodoListProps {
	todoList: Types[];
	handleClick: (id: number) => void;
}

export const TodoList = ({ todoList, handleClick }: TodoListProps) => {
	return (
		<Stack>
			{todoList.map((todo) => (
				<Fragment key={todo.id}>
					<Divider />
					<TodoItem description={todo.description} active={todo.active} handleClick={handleClick.bind(null, todo.id)} />
				</Fragment>
			))}
		</Stack>
	);
};
