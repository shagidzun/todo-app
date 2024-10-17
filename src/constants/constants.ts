import { Todo } from '../types/types.ts';

export const lsTodos: Todo[] = JSON.parse(localStorage.getItem('todos') ?? '[]');
