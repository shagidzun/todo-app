import { Button, Stack, TextField } from '@mui/material';
import { FormEvent, Ref } from 'react';
import { todoInputStyles } from './TodoInput.styles.ts';

interface TodoInputProps {
	handleSubmit: (event: FormEvent) => void;
	inputRef: Ref<HTMLInputElement>;
}

export const TodoInput = ({ handleSubmit, inputRef }: TodoInputProps) => {
	return (
		<form onSubmit={handleSubmit}>
			<Stack direction="row" spacing={2} pb="20px">
				<TextField inputRef={inputRef} sx={todoInputStyles.textField} placeholder="What needs to be done?" />
				<Button type="submit" variant="contained" color="primary">
					Add ToDo
				</Button>
			</Stack>
		</form>
	);
};
