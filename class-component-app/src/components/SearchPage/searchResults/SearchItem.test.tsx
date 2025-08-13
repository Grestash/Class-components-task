import { SearchItem } from './SearchItem';
import { render, screen } from '@testing-library/react';

test('Displays item name and description correctly', () => {
  render(<SearchItem name="Rick Sanchez" overview="Alive - Human" />);

  expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
  expect(screen.getByText(/alive - human/i)).toBeInTheDocument();
});
