import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

// Redirect old hash URLs (/words/#/slug) to /words/slug
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', import.meta.env.BASE_URL + window.location.hash.slice(2));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
