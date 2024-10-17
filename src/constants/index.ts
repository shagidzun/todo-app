import { Todo } from '../types';

export const lsTodos: Todo[] = JSON.parse(localStorage.getItem('todos') ?? '[]');
