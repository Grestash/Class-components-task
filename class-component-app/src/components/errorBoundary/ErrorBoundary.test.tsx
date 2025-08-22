import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { ErrorTest } from './ErrorTest';
import { userEvent } from '@testing-library/user-event';

test('Displays fallback UI when error occurs', async () => {
  render(
    <ErrorBoundary>
      <ErrorTest />
    </ErrorBoundary>
  );

  await userEvent.click(screen.getByRole('button', { name: 'Test Error' }));

  expect(
    screen.getByText(
      'Oops! Something went wrong. Please try refreshing the page or come back later.'
    )
  ).toBeInTheDocument();
});

test('Catches and handles JavaScript errors in child components', async () => {
  const componentDidCatchSpy = jest.spyOn(
    ErrorBoundary.prototype,
    'componentDidCatch'
  );

  render(
    <ErrorBoundary>
      <ErrorTest />
    </ErrorBoundary>
  );

  await userEvent.click(screen.getByRole('button', { name: 'Test Error' }));
  expect(componentDidCatchSpy).toHaveBeenCalled();
});

test('Logs error to console', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error');

  render(
    <ErrorBoundary>
      <ErrorTest />
    </ErrorBoundary>
  );

  await userEvent.click(screen.getByRole('button', { name: 'Test Error' }));
  expect(consoleErrorSpy).toHaveBeenCalled();
});
