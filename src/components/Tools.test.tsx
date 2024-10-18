import { fireEvent, render, screen } from '@testing-library/react';
import { Tools } from './Tools.tsx';

const mockHandlers = {
	All: jest.fn(),
	Active: jest.fn(),
	Completed: jest.fn(),
	'Clear completed': jest.fn(),
	'Clear all': jest.fn(),
};

it('should call the handler functions', () => {
	render(
		<Tools
			items={5}
			handleFilterAll={mockHandlers.All}
			handleFilterActive={mockHandlers.Active}
			handleFilterCompleted={mockHandlers.Completed}
			handleClearCompleted={mockHandlers['Clear completed']}
			handleClearAll={mockHandlers['Clear all']}
			filter="all"
		/>
	);

	for (const handler in mockHandlers) {
		fireEvent.click(screen.getByText(handler));
		expect(mockHandlers[handler as keyof typeof mockHandlers]).toHaveBeenCalledTimes(1);
	}
});
