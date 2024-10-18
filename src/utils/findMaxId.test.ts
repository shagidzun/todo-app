import { findMaxId } from './findMaxId.ts';
import { mockAllTodos } from '../mocks';

it('should return 41', () => {
	expect(findMaxId(mockAllTodos)).toBe(41);
});
