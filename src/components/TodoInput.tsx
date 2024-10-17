import { Button, Stack, TextField } from '@mui/material';
import { FormEvent, forwardRef } from 'react';

interface TodoInputProps {
	handleSubmit: (event: FormEvent) => void;
}

export const TodoInput = forwardRef<HTMLInputElement, TodoInputProps>(({ handleSubmit }, ref) => {
	return (
		<form onSubmit={handleSubmit}>
			<Stack direction="row" spacing={2}>
				<TextField inputRef={ref} sx={{ flexGrow: 1 }} placeholder="What needs to be done?" />
				<Button type="submit" variant="contained" color="primary">
					Add ToDo
				</Button>
			</Stack>
		</form>
	);
});
