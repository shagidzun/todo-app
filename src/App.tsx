import { FormEvent, useMemo, useRef, useState } from 'react';
import './App.css';
import { Paper, Stack } from '@mui/material';
import { TodoInput } from './components/TodoInput.tsx';
import { TodoList } from './components/TodoList.tsx';
import { Filter, Todo } from './types/types.ts';
import { Tools } from './components/Tools.tsx';
import { lsTodos } from './constants/constants.ts';
import { EditTodo } from './components/EditTodo.tsx';
import { filterTodos } from './utils/filterTodos.ts';
import { findMaxId } from './utils/findMaxId.ts';
import { appStyles } from './App.styles.ts';

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
			<Paper sx={appStyles.paper} elevation={2}>
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
