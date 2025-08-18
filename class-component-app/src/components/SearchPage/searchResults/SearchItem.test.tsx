import { SearchItem } from './SearchItem';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('Displays item name and description correctly', () => {
  render(
    <MemoryRouter>
      <SearchItem
        id={1}
        name="Rick Sanchez"
        overview="Alive - Human"
        image=""
      />
    </MemoryRouter>
  );

  expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
  expect(screen.getByText(/alive - human/i)).toBeInTheDocument();
});
