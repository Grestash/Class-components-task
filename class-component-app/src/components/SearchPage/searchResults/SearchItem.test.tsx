import { SearchItem } from './SearchItem';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeContext } from 'context/ThemeContext';
import { ThemeContextType } from 'context/ThemeContext';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from '../../../features/selection/selectionSlice';

const themeValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: jest.fn(),
};

const store = configureStore({
  reducer: {
    selection: selectionReducer,
  },
  preloadedState: {
    selection: [1, 2],
  },
});

test('Displays item name and description correctly', () => {
  render(
    <Provider store={store}><ThemeContext.Provider value={themeValue}><MemoryRouter>
    <SearchItem
      id={1}
      name="Rick Sanchez"
      overview="Alive - Human"
      image=""
    />
  </MemoryRouter></ThemeContext.Provider> </Provider>
     

  );

  expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
  expect(screen.getByText(/alive - human/i)).toBeInTheDocument();
});
