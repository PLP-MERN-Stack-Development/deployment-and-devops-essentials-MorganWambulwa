module.exports = {
  projects: [
    //Backend Tests
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/backend/tests/**/*.test.js'],
      moduleFileExtensions: ['js', 'json', 'node'],
      setupFilesAfterEnv: ['<rootDir>/backend/tests/setup.js'],
      coverageDirectory: '<rootDir>/coverage/backend',
      collectCoverageFrom: [
        'backend/src/**/*.js',
        '!backend/src/config/**',
        '!**/node_modules/**',
      ],
    },

    //Frontend Tests
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/frontend/src/**/*.{test,spec}.{js,jsx}'],
      moduleFileExtensions: ['js', 'jsx', 'json'],

      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$':
          '<rootDir>/frontend/src/tests/__mocks__/fileMock.js',
      },

      setupFilesAfterEnv: ['<rootDir>/frontend/src/tests/setup.js'],

      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
      },

      coverageDirectory: '<rootDir>/coverage/frontend',
      collectCoverageFrom: [
        'frontend/src/**/*.{js,jsx}',
        '!frontend/src/index.js',
        '!frontend/src/main.jsx',
        '!**/node_modules/**',
      ],
    },
  ],

  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'clover', 'html'],

  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 70,
      lines: 70,
    },
  },

  testTimeout: 10000,
};
