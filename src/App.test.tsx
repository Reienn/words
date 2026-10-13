import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders writings list', () => {
  render(<App />);
  expect(screen.getByText('Słowa')).toBeInTheDocument();
  expect(screen.getByText('Bezmiary bezwładu')).toBeInTheDocument();
});

test('renders a writing by its URL', () => {
  window.history.pushState(null, '', `${import.meta.env.BASE_URL}haiku`);
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Haiku' })).toBeInTheDocument();
});
