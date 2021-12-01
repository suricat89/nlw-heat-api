/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/server/',
    '/migrations/',
    '/jest/',
    '__data__',
    '__interceptors__'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['./jest/jest.setup.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/server/',
    '/migrations/',
    '/jest/',
    '__data__',
    '__interceptors__'
  ],
  verbose: true
};
