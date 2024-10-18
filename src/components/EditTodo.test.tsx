import { fireEvent, render, screen } from '@testing-library/react';
import { EditTodo } from './EditTodo.tsx';
import { createRef } from 'react';

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();
const mockDescription = 'test';
const mockRef = createRef<HTMLInputElement>();

it('should have the default input value', () => {
	render(
		<EditTodo
			isOpen={true}
			onClose={mockOnClose}
			onSave={mockOnSave}
			description={mockDescription}
			descriptionRef={mockRef}
		/>
	);

	expect(screen.getByLabelText(/Todo/)).toHaveAttribute('value', mockDescription);
});

it('should pass the ref correctly', () => {
	render(
		<EditTodo
			isOpen={true}
			onClose={mockOnClose}
			onSave={mockOnSave}
			description={mockDescription}
			descriptionRef={mockRef}
		/>
	);

	expect(mockRef.current).toBeInstanceOf(HTMLInputElement);
	expect(mockRef.current?.value).toBe(mockDescription);
});

it('should call the handler functions', () => {
	render(
		<EditTodo
			isOpen={true}
			onClose={mockOnClose}
			onSave={mockOnSave}
			description={mockDescription}
			descriptionRef={mockRef}
		/>
	);

	fireEvent.click(screen.getByText('Cancel'));
	fireEvent.click(screen.getByText('Save'));

	expect(mockOnClose).toHaveBeenCalledTimes(1);
	expect(mockOnSave).toHaveBeenCalledTimes(1);
});
