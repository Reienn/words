import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Entries from './components/entries-list.component';
import Entry from './components/entry.component';
import { get as getEntries } from './services/entries.service';

const entries = getEntries();

export default function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Entries entries={entries} /></Route>
        <Route exact path="/:slug" children={<Entry entries={entries} />} />
      </Switch>
    </Router>
  );
}
