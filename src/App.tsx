import { FormEvent, useRef, useState } from 'react';
import './App.css';
import { Paper, Stack } from '@mui/material';
import { TodoInput } from './components/TodoInput.tsx';
import { TodoList } from './components/TodoList.tsx';
import { Todo } from './types/todo.ts';

function findMaxId(todos: Todo[]) {
	let maxId = 0;
	todos.forEach((todo) => {
		if (todo.id > maxId) {
			maxId = todo.id;
		}
	});

	return maxId;
}

function App() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (inputRef.current?.value) {
			console.log(todos);
			const newTodo: Todo = {
				id: findMaxId(todos) + 1,
				description: inputRef.current.value,
				active: true,
			};

			setTodos(todos.concat([newTodo]));
			inputRef.current.value = '';
		}
	};

	return (
		<Paper sx={{ p: '20px', minWidth: '500px', minHeight: '600px' }} elevation={2}>
			<Stack>
				<TodoInput ref={inputRef} handleSubmit={handleSubmit} />
				<TodoList todoList={todos} />
			</Stack>
		</Paper>
	);
}

export default App;
