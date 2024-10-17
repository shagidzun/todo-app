import { Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material';
import { Filter } from '../types/types.ts';

interface ToolsProps {
	items: number;
	handleFilterAll: VoidFunction;
	handleFilterActive: VoidFunction;
	handleFilterCompleted: VoidFunction;
	handleClearCompleted: VoidFunction;
	handleClearAll: VoidFunction;
	filter: Filter;
}

export const Tools = ({
	items,
	handleFilterAll,
	handleFilterActive,
	handleFilterCompleted,
	handleClearCompleted,
	handleClearAll,
	filter,
}: ToolsProps) => {
	return (
		<Stack mt="auto">
			<Divider />
			<Stack direction="row" mt="10px" justifyContent="space-between">
				<Typography my="auto" variant="body1">
					{items} todos left
				</Typography>
				<Stack alignItems="center">
					<ButtonGroup size="small">
						<Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={handleFilterAll}>
							All
						</Button>
						<Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={handleFilterActive}>
							Active
						</Button>
						<Button variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={handleFilterCompleted}>
							Completed
						</Button>
					</ButtonGroup>
					<ButtonGroup size="small" sx={{ mt: '10px' }}>
						<Button onClick={handleClearCompleted}>Clear completed</Button>
						<Button onClick={handleClearAll}>Clear all</Button>
					</ButtonGroup>
				</Stack>
			</Stack>
		</Stack>
	);
};
