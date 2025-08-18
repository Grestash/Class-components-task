import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

let consoleErrorMock: jest.SpyInstance;

beforeAll(() => {
  consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  consoleErrorMock.mockRestore();
});

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: jest.fn(),
});
