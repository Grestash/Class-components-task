import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '\\.(png|jpg|jpeg|gif|webp)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(svg\\?react)$': '<rootDir>/src/__mocks__/svgMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',

    '^@/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^types$': '<rootDir>/src/types.ts',
    '^context/(.*)$': '<rootDir>/src/context/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^features/(.*)$': '<rootDir>/src/features/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    '^.+\\.svg(\\?react)?$': 'jest-transformer-svg',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
};

export default config;
