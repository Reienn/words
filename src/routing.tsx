import { BrowserRouter, Route, Routes } from 'react-router';
import Entries from './components/entries-list.component';
import Entry from './components/entry.component';
import { get as getEntries } from './services/entries.service';

const entries = getEntries();

export default function Routing() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Entries entries={entries} />} />
        <Route path="/:slug" element={<Entry entries={entries} />} />
      </Routes>
    </BrowserRouter>
  );
}
