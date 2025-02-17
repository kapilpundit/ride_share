module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.jts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Transform JavaScript files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Ensure axios is transformed
  ],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
};
