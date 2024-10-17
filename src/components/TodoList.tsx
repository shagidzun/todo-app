import { Todo } from '../types/types.ts';
import { Divider, Stack, Typography } from '@mui/material';
import { TodoItem } from './TodoItem.tsx';
import { Fragment } from 'react';

interface TodoListProps {
	todoList: Todo[];
	handleClick: (id: number) => void;
	handleEdit: (todo: Todo) => void;
	handleDelete: (todo: Todo) => void;
}

export const TodoList = ({ todoList, handleClick, handleEdit, handleDelete }: TodoListProps) => {
	return todoList.length > 0 ? (
		<Stack>
			{todoList.map((todo) => (
				<Fragment key={todo.id}>
					<Divider />
					<TodoItem
						todo={todo}
						handleClick={handleClick.bind(null, todo.id)}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				</Fragment>
			))}
		</Stack>
	) : (
		<Typography variant="h5">No todos</Typography>
	);
};
