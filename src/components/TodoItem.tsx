import { Button, Stack, Toolbar, Typography } from '@mui/material';
import CheckedCircle from '@mui/icons-material/CheckCircleOutline';
import UncheckedCircle from '@mui/icons-material/RadioButtonUnchecked';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../types/types.ts';

interface TodoItemProps {
	todo: Todo;
	handleClick: VoidFunction;
	handleEdit: (todo: Todo) => void;
	handleDelete: (todo: Todo) => void;
}

export const TodoItem = ({ todo, handleClick, handleEdit, handleDelete }: TodoItemProps) => {
	return (
		<Stack direction="row" sx={{ '&:hover .MuiToolbar-root': { display: 'flex' }, height: '56px' }}>
			<Button onClick={handleClick} size="small">
				{todo.active ? <UncheckedCircle /> : <CheckedCircle />}
			</Button>
			<Typography sx={{ textDecoration: todo.active ? 'none' : 'line-through', my: 'auto', wordBreak: 'break-all' }}>
				{todo.description}
			</Typography>
			<Toolbar sx={{ ml: 'auto', display: 'none' }}>
				<Button size="small" onClick={handleEdit.bind(null, todo)}>
					<EditIcon />
				</Button>
				<Button size="small">
					<DeleteIcon onClick={handleDelete.bind(null, todo)} />
				</Button>
			</Toolbar>
		</Stack>
	);
};
