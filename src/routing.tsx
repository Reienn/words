import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Entries from './components/entries-list.component';
import Entry from './components/entry.component';
import { useEffect, useState } from 'react';
import { EntryData } from './models/entry.data';
import { get as getEntries } from './services/entries.service';

export default function Routing() {
  const [entries, setEntries] = useState<EntryData[]>([]);

  useEffect(() => {
    getEntries().then(setEntries);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/"><Entries entries={entries} /></Route>
        <Route exact path="/:slug" children={<Entry entries={entries} />} />
      </Switch>
    </Router>
  );
}