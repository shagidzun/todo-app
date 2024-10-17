import { Button, Stack, Typography } from '@mui/material';
import CheckedCircle from '@mui/icons-material/CheckCircleOutline';
import UncheckedCircle from '@mui/icons-material/RadioButtonUnchecked';

interface TodoItemProps {
	description: string;
	active: boolean;
	handleClick: VoidFunction;
}

export const TodoItem = ({ description, active, handleClick }: TodoItemProps) => {
	return (
		<Stack direction="row">
			<Button onClick={handleClick} size="small">
				{active ? <UncheckedCircle /> : <CheckedCircle />}
			</Button>
			<Typography sx={{ textDecoration: active ? 'none' : 'line-through', my: 'auto' }}>{description}</Typography>
		</Stack>
	);
};
