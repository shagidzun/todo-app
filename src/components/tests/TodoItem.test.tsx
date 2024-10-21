import { fireEvent, render, screen } from '@testing-library/react';
import { TodoItem } from '../TodoItem.tsx';
import { mockActiveTodos, mockCompletedTodos } from '../../mocks';

const mockActiveTodo = mockActiveTodos[0];
const mockCompletedTodo = mockCompletedTodos[0];

const mockHandleClick = jest.fn();
const mockHandleEdit = jest.fn();
const mockHandleDelete = jest.fn();

it('should render the component correctly', () => {
	render(
		<TodoItem
			todo={mockActiveTodo}
			handleClick={mockHandleClick}
			handleEdit={mockHandleEdit}
			handleDelete={mockHandleDelete}
		/>
	);

	expect(screen.getByText(mockActiveTodo.description)).toBeInTheDocument();
	expect(screen.getByTestId('RadioButtonUncheckedIcon')).toBeInTheDocument();
	expect(screen.getByTestId('EditIcon')).toBeInTheDocument();
	expect(screen.getByTestId('DeleteIcon')).toBeInTheDocument();
});

it('should call handler functions', () => {
	render(
		<TodoItem
			todo={mockActiveTodo}
			handleClick={mockHandleClick}
			handleEdit={mockHandleEdit}
			handleDelete={mockHandleDelete}
		/>
	);

	fireEvent.click(screen.getByTestId('RadioButtonUncheckedIcon'));
	fireEvent.click(screen.getByTestId('EditIcon'));
	fireEvent.click(screen.getByTestId('DeleteIcon'));

	expect(mockHandleClick).toHaveBeenCalledTimes(1);
	expect(mockHandleEdit).toHaveBeenCalledTimes(1);
	expect(mockHandleDelete).toHaveBeenCalledTimes(1);
});

it('should style the text correctly', () => {
	const renderer = render(
		<TodoItem
			todo={mockActiveTodo}
			handleClick={mockHandleClick}
			handleEdit={mockHandleEdit}
			handleDelete={mockHandleDelete}
		/>
	);

	expect(screen.getByText(mockActiveTodo.description)).toHaveStyle({ textDecoration: 'none', opacity: 1 });

	renderer.rerender(
		<TodoItem
			todo={mockCompletedTodo}
			handleClick={mockHandleClick}
			handleEdit={mockHandleEdit}
			handleDelete={mockHandleDelete}
		/>
	);

	expect(screen.getByText(mockCompletedTodo.description)).toHaveStyle({
		textDecoration: 'line-through',
		opacity: 0.66,
	});
});
