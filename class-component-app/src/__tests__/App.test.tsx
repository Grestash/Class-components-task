import { act, render, screen, waitFor } from '@testing-library/react';
import SearchPage from '../pages/SearchPage';
import '@testing-library/jest-dom';
import { API_URL } from '../pages/SearchPage';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(<SearchPage />);
  expect(true).toBeTruthy();
});

test('renders header title', () => {
  render(<SearchPage />);
  const title = screen.getByText(/Rick and Morty Character Search/i);
  expect(title).toBeInTheDocument();
});

test('Makes initial API call', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
        },
      ],
    }),
  });

  render(<SearchPage />);

  await waitFor(() => {
    expect(fetch).toHaveBeenLastCalledWith(`${API_URL}/?page=1`);
  });
});

test('Manages loading states during API calls', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
        },
      ],
    }),
  });

  render(<SearchPage />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});

test('Calls API with correct parameters', async () => {
  render(<SearchPage />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.type(input, 'Rick');
  await userEvent.click(button);

  await waitFor(() => {
    expect(fetch).toHaveBeenLastCalledWith(
      `https://rickandmortyapi.com/api/character/?name=Rick&page=1`
    );
  });
});

test('Handles successful API responses', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
        },
      ],
    }),
  });

  render(<SearchPage />);

  await waitFor(() => {
    expect(screen.queryByText(/rick sanchez/i)).toBeInTheDocument();
  });
});

test('Handles API error responses', async () => {
  (fetch as jest.Mock).mockImplementation((url) => {
    if (url.includes('name=somecrazytext')) {
      return Promise.resolve({
        ok: false,
        status: 404,
        json: async () => ({}),
      });
    } else {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          results: [
            {
              id: 1,
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
            },
          ],
        }),
      });
    }
  });

  render(<SearchPage />);

  await waitFor(() => {
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.type(input, 'somecrazytext');
  await userEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('No characters found.')).toBeInTheDocument();
  });
});

test('Shows network error message', async () => {
  (fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

  render(<SearchPage />);

  await waitFor(() => {
    expect(
      screen.getByText('Network error. Please check your internet connection.')
    ).toBeInTheDocument();
  });
});
