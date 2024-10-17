import { Styles } from './types';

export const appStyles = {
	title: {
		color: 'wheat',
	},
	paper: {
		display: 'flex',
		px: '20px',
		pt: '20px',
		width: { md: '768px', sm: '576px', xs: '400px' },
		height: '700px',
		overflowY: 'auto',
		position: 'relative',
	},
} satisfies Styles;
