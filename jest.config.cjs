module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	transform: {
		'^.+\\.[tj]sx?$': [
			'@swc/jest',
			{
				jsc: {
					parser: {
						tsx: false,
						syntax: 'typescript',
					},
					transform: {
						react: {
							runtime: 'automatic',
						},
					},
				},
			},
		],
	},
};
