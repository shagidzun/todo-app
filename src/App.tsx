import { FormEvent, useMemo, useRef, useState } from 'react';
import './App.css';
import { Paper, Stack } from '@mui/material';
import { TodoInput } from './components/TodoInput.tsx';
import { TodoList } from './components/TodoList.tsx';
import { Filter, Todo } from './types/types.ts';
import { Tools } from './components/Tools.tsx';

function findMaxId(todos: Todo[]) {
	let maxId = 0;
	todos.forEach((todo) => {
		if (todo.id > maxId) {
			maxId = todo.id;
		}
	});

	return maxId;
}

function filterTodos(todos: Todo[], filter: Filter) {
	switch (filter) {
		case 'all':
			return todos;
		case 'active':
			return todos.filter((todo) => todo.active);
		case 'completed':
			return todos.filter((todo) => !todo.active);
	}
}

function App() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [todos, setTodos] = useState<Todo[]>([]);
	const [filter, setFilter] = useState<Filter>('all');

	const activeTodosCount = useMemo(() => todos.filter((todo) => todo.active).length, [todos]);

	const filteredTodos = useMemo(() => filterTodos(todos, filter), [todos, filter]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (inputRef.current?.value) {
			const newTodo: Todo = {
				id: findMaxId(todos) + 1,
				description: inputRef.current.value,
				active: true,
			};

			setTodos(todos.concat([newTodo]));
			inputRef.current.value = '';
		}
	};

	const handleCheckTodo = (id: number) => {
		const targetTodo = todos.find((todo) => todo.id === id);
		if (targetTodo) {
			const updatedTodo: Todo = {
				...targetTodo,
				active: !targetTodo.active,
			};
			setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
		}
	};

	const handleFilterAll = () => {
		setFilter('all');
	};

	const handleFilterActive = () => {
		setFilter('active');
	};

	const handleFilterCompleted = () => {
		setFilter('completed');
	};

	const handleClearCompleted = () => {
		const newTodos = todos.filter((todo) => todo.active);
		setTodos(newTodos);
	};

	const handleClearAll = () => {
		setTodos([]);
	};

	return (
		<Paper sx={{ display: 'flex', p: '20px', minWidth: '500px', minHeight: '600px' }} elevation={2}>
			<Stack width="100%">
				<TodoInput ref={inputRef} handleSubmit={handleSubmit} />
				<TodoList todoList={filteredTodos} handleClick={handleCheckTodo} />
				<Tools
					filter={filter}
					items={activeTodosCount}
					handleFilterAll={handleFilterAll}
					handleFilterActive={handleFilterActive}
					handleFilterCompleted={handleFilterCompleted}
					handleClearCompleted={handleClearCompleted}
					handleClearAll={handleClearAll}
				/>
			</Stack>
		</Paper>
	);
}

export default App;
