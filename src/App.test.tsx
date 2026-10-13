import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders writings list', () => {
  render(<App />);
  expect(screen.getByText('Słowa')).toBeInTheDocument();
  expect(screen.getByText('Bezmiary bezwładu')).toBeInTheDocument();
});
