import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders I75 League link', () => {
  render(<App />);
  const linkElement = screen.getByText(/I75 League/i);
  expect(linkElement).toBeInTheDocument();
});
