import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

test('renders loading spinner', () => {
  render(<LoadingSpinner />);
  const loadingElement = screen.getByText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});