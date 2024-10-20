import { FormEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import { Paper, Stack, Typography } from '@mui/material';
import { EditTodo, TodoInput, TodoList, Tools } from './components';
import { Filter, Todo } from './types';
import { lsTodos } from './constants';
import { filterTodos, findMaxId } from './utils';
import { appStyles } from './App.styles.ts';

function App() {
	const inputRef = useRef<HTMLInputElement>(null); // input for new todos
	const descriptionRef = useRef<HTMLInputElement>(null); // input for editing
	const currentTodo = useRef<Todo>(); // data for autocomplete in modal
	const [todos, setTodos] = useState<Todo[]>(lsTodos);
	const [filter, setFilter] = useState<Filter>('all');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const activeTodosCount = todos.filter((todo) => todo.active).length;

	const filteredTodos = filterTodos(todos, filter);

	const handleAddTodo = (event: FormEvent) => {
		event.preventDefault();
		if (inputRef.current?.value) {
			const newTodo: Todo = {
				id: findMaxId(todos) + 1,
				description: inputRef.current.value,
				active: true,
			};

			const newTodos = todos.concat([newTodo]);
			setTodos(newTodos);
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
		}
	};

	const handleClearCompleted = () => {
		const newTodos = todos.filter((todo) => todo.active);
		setTodos(newTodos);
	};

	const handleClearAll = () => {
		setTodos([]);
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
			<Typography variant="h1" sx={appStyles.title}>
				todos
			</Typography>
			<Paper sx={appStyles.paper} elevation={5}>
				<Stack width="100%">
					<TodoInput inputRef={inputRef} handleSubmit={handleAddTodo} />
					<TodoList
						todoList={filteredTodos}
						handleClick={handleCheckTodo}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						filter={filter}
					/>
					<Tools
						filter={filter}
						items={activeTodosCount}
						handleFilterAll={() => setFilter('all')}
						handleFilterActive={() => setFilter('active')}
						handleFilterCompleted={() => setFilter('completed')}
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
