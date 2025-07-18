import { SearchBar } from './SearchBar';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

beforeEach(() => {
  localStorage.clear();
});

test('Renders search input and search button', () => {
  render(<SearchBar onSearch={() => {}} />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('Displays previously saved search term from localStorage on mount', () => {
  localStorage.setItem('searchQuery', 'Rick');

  render(<SearchBar onSearch={() => {}} />);

  expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
});

test('Shows empty input when no saved term exists', () => {
  localStorage.setItem('searchQuery', '');

  render(<SearchBar onSearch={() => {}} />);

  expect(screen.getByDisplayValue('')).toBeInTheDocument();
});

test('Updates input value when user types', async () => {
  render(<SearchBar onSearch={() => {}} />);

  const input = screen.getByRole('textbox');

  await userEvent.type(input, 'Rick');

  expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
});

test('Saves search term to localStorage when search button is clicked', async () => {
  render(<SearchBar onSearch={() => {}} />);
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.type(input, 'Rick');
  await userEvent.click(button);

  expect(localStorage.getItem('searchQuery')).toBe('Rick');
});

test('Trims whitespace from search input before saving', async () => {
  render(<SearchBar onSearch={() => {}} />);
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.type(input, 'Rick');
  await userEvent.click(button);

  expect(localStorage.getItem('searchQuery')).toBe('Rick');
});

test('Triggers search callback with correct parameters', async () => {
  const onSearchMock = jest.fn();
  render(<SearchBar onSearch={onSearchMock} />);
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.type(input, 'Rick');
  await userEvent.click(button);

  expect(onSearchMock).toHaveBeenCalledWith('Rick');
});

test('Overwrites existing localStorage value when new search is performed', async () => {
  localStorage.setItem('searchQuery', 'Morty');

  render(<SearchBar onSearch={() => {}} />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.clear(input);
  await userEvent.type(input, 'Rick');
  await userEvent.click(button);

  expect(localStorage.getItem('searchQuery')).toBe('Rick');
});
