import { render, screen } from '@testing-library/react';
import { TodoList } from '../TodoList.tsx';
import { mockAllTodos } from '../../mocks';

const mockHandleClick = jest.fn();
const mockHandleEdit = jest.fn();
const mockHandleDelete = jest.fn();

it('should render the list correctly', () => {
	render(
		<TodoList
			todoList={mockAllTodos}
			handleClick={mockHandleClick}
			handleEdit={mockHandleEdit}
			handleDelete={mockHandleDelete}
			filter="all"
		/>
	);

	mockAllTodos.forEach((todo) => {
		expect(screen.getByText(todo.description)).toBeInTheDocument();
	});
});

it('should show text on zero items', () => {
	const renderer = render(
		<TodoList
			todoList={[]}
			handleClick={mockHandleClick}
			handleEdit={mockHandleEdit}
			handleDelete={mockHandleDelete}
			filter="all"
		/>
	);

	expect(screen.getByText('No todos')).toBeInTheDocument();

	renderer.rerender(
		<TodoList
			todoList={[]}
			handleClick={mockHandleClick}
			handleEdit={mockHandleEdit}
			handleDelete={mockHandleDelete}
			filter="active"
		/>
	);

	expect(screen.getByText('No active todos')).toBeInTheDocument();

	renderer.rerender(
		<TodoList
			todoList={[]}
			handleClick={mockHandleClick}
			handleEdit={mockHandleEdit}
			handleDelete={mockHandleDelete}
			filter="completed"
		/>
	);

	expect(screen.getByText('No completed todos')).toBeInTheDocument();
});
