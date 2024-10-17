import { FormEvent, useMemo, useRef, useState } from 'react';
import './App.css';
import { Paper, Stack } from '@mui/material';
import { TodoInput } from './components/TodoInput.tsx';
import { TodoList } from './components/TodoList.tsx';
import { Filter, Todo } from './types/types.ts';
import { Tools } from './components/Tools.tsx';
import { lsTodos } from './constants/constants.ts';
import { EditTodo } from './components/EditTodo.tsx';

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
	const descriptionRef = useRef<HTMLInputElement>(null);
	const currentTodo = useRef<Todo>();
	const [todos, setTodos] = useState<Todo[]>(lsTodos);
	const [filter, setFilter] = useState<Filter>('all');
	const [isOpen, setIsOpen] = useState(false);

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

			const newTodos = todos.concat([newTodo]);
			setTodos(newTodos);
			localStorage.setItem('todos', JSON.stringify(newTodos));
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

			const newTodos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
			setTodos(newTodos);
			localStorage.setItem('todos', JSON.stringify(newTodos));
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
		localStorage.setItem('todos', JSON.stringify(newTodos));
	};

	const handleClearAll = () => {
		setTodos([]);
		localStorage.removeItem('todos');
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleSave = () => {
		if (currentTodo.current && descriptionRef.current?.value) {
			const { id, active } = currentTodo.current;
			const editedTodo: Todo = {
				id,
				description: descriptionRef.current.value,
				active,
			};

			const newTodos = todos.map((todo) => (todo.id === id ? editedTodo : todo));
			setTodos(newTodos);
			localStorage.setItem('todos', JSON.stringify(newTodos));
			setIsOpen(false);
		}
	};

	const handleEdit = (todo: Todo) => {
		currentTodo.current = todo;
		setIsOpen(true);
	};

	const handleDelete = (todo: Todo) => {
		const newTodos = todos.filter((item) => item.id !== todo.id);
		setTodos(newTodos);
		localStorage.setItem('todos', JSON.stringify(newTodos));
	};

	return (
		<>
			<Paper
				sx={{
					display: 'flex',
					px: '20px',
					pt: '20px',
					width: { md: '768px', sm: '576px', xs: '400px' },
					height: '700px',
					overflowY: 'scroll',
					position: 'relative',
				}}
				elevation={2}
			>
				<Stack width="100%">
					<TodoInput inputRef={inputRef} handleSubmit={handleSubmit} />
					<TodoList
						todoList={filteredTodos}
						handleClick={handleCheckTodo}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
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
			<EditTodo
				isOpen={isOpen}
				onClose={handleClose}
				onSave={handleSave}
				description={currentTodo.current?.description ?? ''}
				descriptionRef={descriptionRef}
			/>
		</>
	);
}

export default App;
