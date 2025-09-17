import { SearchResults } from './searchResults';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from '../../../features/selection/selectionSlice';
import { Provider } from 'react-redux';
import { ThemeContextType } from 'context/ThemeContext';
import { ThemeContext } from 'context/ThemeContext';

const store = configureStore({
  reducer: {
    selection: selectionReducer,
  },
  preloadedState: {
    selection: [1, 2],
  },
});

const themeValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: jest.fn(),
};

test('Renders correct number of items when data is provided', () => {
  const MockItems = [
    { id: 1, name: 'Rick Sanchez', overview: 'Alive - Human', image: '' },
    { id: 2, name: 'Morty Smith', overview: 'Alive - Human', image: '' },
    { id: 3, name: 'Summer Smith', overview: 'Alive - Human', image: '' },
  ];

  render(
    <Provider store={store}>
      <ThemeContext.Provider value={themeValue}>
        <MemoryRouter>
          <SearchResults items={MockItems} isLoading={false} error={null} />
        </MemoryRouter>
      </ThemeContext.Provider>
    </Provider>
  );
  const itemsArr = document.querySelectorAll('.search-item');

  expect(itemsArr.length).toBe(3);
});

test('Displays "no results" message when data array is empty', () => {
  render(
    <SearchResults
      items={[]}
      isLoading={false}
      error={'No characters found.'}
    />
  );
  expect(screen.getByText('No characters found.')).toBeInTheDocument();
});

test('Correctly displays item names and descriptions', () => {
  const MockItems = [
    { id: 1, name: 'Rick Sanchez', overview: 'Alive - Human', image: '' },
  ];

  render(
    <Provider store={store}>
      <ThemeContext.Provider value={themeValue}>
        <MemoryRouter>
          <SearchResults items={MockItems} isLoading={false} error={null} />
        </MemoryRouter>
      </ThemeContext.Provider>
    </Provider>
  );

  expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
  expect(screen.getByText(/alive - human/i)).toBeInTheDocument();
});

test('Shows loading state while fetching data', () => {
  render(<SearchResults items={[]} isLoading={true} error={null} />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
