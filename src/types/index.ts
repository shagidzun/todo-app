import { SxProps, Theme } from '@mui/material';

export type Todo = {
	id: number;
	description: string;
	active: boolean;
};

export type Filter = 'all' | 'active' | 'completed';

export type Styles = {
	[key: string]: SxProps<Theme> | ((...args: never[]) => SxProps<Theme>);
};
