import { render, screen } from '@testing-library/react';
import { beforeEach, expect, test } from 'vitest';
import App from './App';
import { legacyHashRedirect } from './legacy-hash-redirect';

const base = import.meta.env.BASE_URL;

beforeEach(() => {
  window.history.replaceState(null, '', base);
});

test('renders writings list in the original order', () => {
  render(<App />);
  expect(screen.getByText('Słowa')).toBeInTheDocument();
  const titles = screen.getAllByRole('listitem').map(li => li.textContent);
  expect(titles[0]).toBe('Bezmiary bezwładu');
  expect(titles.slice(-11, -9)).toEqual(['PASTerz', 'Post scriptum']);
});

test('renders a writing by its URL', () => {
  window.history.pushState(null, '', `${base}haiku`);
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Haiku' })).toBeInTheDocument();
  expect(document.title).toBe('Haiku – Słowa');
});

test('redirects unknown URLs to the home page', () => {
  window.history.pushState(null, '', `${base}does-not-exist`);
  render(<App />);
  expect(window.location.pathname).toBe(base);
  expect(screen.getByText('Słowa')).toBeInTheDocument();
});

test('redirects old hash links', () => {
  window.history.replaceState(null, '', '/words/#/haiku');
  legacyHashRedirect(window.location, window.history, '/words/');
  expect(window.location.pathname + window.location.hash).toBe('/words/haiku');
});
