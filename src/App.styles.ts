import { Styles } from './types/types.ts';

export const appStyles = {
	paper: {
		display: 'flex',
		px: '20px',
		pt: '20px',
		width: { md: '768px', sm: '576px', xs: '400px' },
		height: '700px',
		overflowY: 'scroll',
		position: 'relative',
	},
} satisfies Styles;
