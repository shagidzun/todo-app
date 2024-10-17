import { Button, Stack, Toolbar, Typography } from '@mui/material';
import CheckedCircle from '@mui/icons-material/CheckCircleOutline';
import UncheckedCircle from '@mui/icons-material/RadioButtonUnchecked';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../types';
import { todoItemStyles } from './TodoItem.styles.ts';

interface TodoItemProps {
	todo: Todo;
	handleClick: VoidFunction;
	handleEdit: (todo: Todo) => void;
	handleDelete: (todo: Todo) => void;
}

export const TodoItem = ({ todo, handleClick, handleEdit, handleDelete }: TodoItemProps) => {
	return (
		<Stack direction="row" sx={todoItemStyles.container}>
			<Button onClick={handleClick} size="small">
				{todo.active ? <UncheckedCircle /> : <CheckedCircle color="success" />}
			</Button>
			<Typography sx={todoItemStyles.description(todo)}>{todo.description}</Typography>
			<Toolbar sx={todoItemStyles.toolbar}>
				<Button size="small" onClick={handleEdit.bind(null, todo)} sx={todoItemStyles.btn}>
					<EditIcon />
				</Button>
				<Button size="small" onClick={handleDelete.bind(null, todo)} sx={todoItemStyles.btn}>
					<DeleteIcon />
				</Button>
			</Toolbar>
		</Stack>
	);
};
