import { render, screen } from '@testing-library/react';
import App from './App';

test('renders forum app', () => {
  render(<App />);
  const linkElement = screen.getByText(/dicoding forum/i);
  expect(linkElement).toBeInTheDocument();
});