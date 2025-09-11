import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Para poder renderizar React/JSX
  roots: ['<rootDir>/tests', '<rootDir>/lib'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testMatch: [
    '**/__tests__/**/*.?([jt])s?(x)',
    '**/?(*.)+(spec|test).?([jt])s?(x)',
  ],

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Babel transforma TS + JSX
  },

  transformIgnorePatterns: [
  'node_modules/(?!(react|react-dom|@testing-library|nanoid|@lexical)/)'
],


  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // mocks para CSS
  },

  setupFiles: ['<rootDir>/jest.setup.ts'], // carga dotenv antes de los tests
  setupFilesAfterEnv: ['<rootDir>/jest.setupAfterEnv.ts'], // si quieres setup de RTL o matchers

  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.{ts,tsx}', '!lib/**/*.d.ts', '!lib/**/__tests__/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'lcov', 'html'],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 },
  },

  maxWorkers: '50%',
};

export default config;
