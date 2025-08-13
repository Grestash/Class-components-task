import type {Config} from 'jest'

const config: Config = {
  testEnvironment: 'jest-environment-jsdom', // Same name of the lib you installed
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // The file you created to extend jest config and "implement" the jest-dom environment in the jest globals
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js', // The global stub for weird files
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // The mock for style related files
    '^@/(.*)$': '<rootDir>/src/$1', // [optional] Are you using aliases?
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
