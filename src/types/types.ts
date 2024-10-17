export type Todo = {
	id: number;
	description: string;
	active: boolean;
};

export type Filter = 'all' | 'active' | 'completed';
