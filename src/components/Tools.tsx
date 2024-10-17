import { Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material';
import { Filter } from '../types';

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
		<Stack mt="auto" position="sticky" bottom={0} right={0} bgcolor="white" pb="20px">
			<Divider />
			<Stack direction="row" mt="20px" justifyContent="space-between">
				<Typography my="auto" variant="body1">
					{items} todo{items === 1 ? '' : 's'} left
				</Typography>
				<Stack alignItems="center" gap="10px">
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
					<ButtonGroup size="small">
						<Button onClick={handleClearCompleted}>Clear completed</Button>
						<Button onClick={handleClearAll}>Clear all</Button>
					</ButtonGroup>
				</Stack>
			</Stack>
		</Stack>
	);
};
