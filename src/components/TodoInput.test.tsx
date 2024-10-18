import { fireEvent, render, screen } from '@testing-library/react';
import { TodoInput } from './TodoInput.tsx';
import { createRef, FormEvent } from 'react';
import userEvent from '@testing-library/user-event';

const mockHandleSubmit = jest.fn((event: FormEvent) => {
	event.preventDefault();
});
const mockInputRef = createRef<HTMLInputElement>();

it('should render the component correctly', () => {
	render(<TodoInput handleSubmit={mockHandleSubmit} inputRef={mockInputRef} />);

	expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
	expect(screen.getByText('Add ToDo')).toBeInTheDocument();
});

it('should call the handler fn', () => {
	render(<TodoInput handleSubmit={mockHandleSubmit} inputRef={mockInputRef} />);

	fireEvent.click(screen.getByText('Add ToDo'));

	expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
});

it('should pass the inputRef correctly', async () => {
	render(<TodoInput handleSubmit={mockHandleSubmit} inputRef={mockInputRef} />);

	const user = userEvent.setup();

	await user.type(screen.getByPlaceholderText('What needs to be done?'), 'test');

	expect(mockInputRef.current).toBeInstanceOf(HTMLInputElement);
	expect(mockInputRef.current?.value).toBe('test');
});
