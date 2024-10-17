import { Button, Dialog, DialogTitle, Paper, Stack, TextField } from '@mui/material';
import { Ref } from 'react';
import { editTodoStyles } from './EditTodo.styles.ts';

export function EditTodo({
	isOpen,
	onClose,
	onSave,
	description,
	descriptionRef,
}: {
	isOpen: boolean;
	onClose: VoidFunction;
	onSave: VoidFunction;
	description: string;
	descriptionRef: Ref<HTMLInputElement>;
}) {
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			transitionDuration={0}
			disableScrollLock
			PaperProps={editTodoStyles.dialogPaper}
		>
			<DialogTitle>Edit todo</DialogTitle>
			<Paper sx={editTodoStyles.paper} elevation={2}>
				<Stack alignItems="center" gap="24px" width="100%">
					<TextField required inputRef={descriptionRef} label="Todo" fullWidth defaultValue={description} />
					<Stack direction="row" gap="10px">
						<Button variant="contained" onClick={onSave}>
							Save
						</Button>
						<Button variant="outlined" onClick={onClose}>
							Cancel
						</Button>
					</Stack>
				</Stack>
			</Paper>
		</Dialog>
	);
}
