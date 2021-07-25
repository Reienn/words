import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Poems from './components/poems-list.component';
import Poem from './components/poem.component';
import { useEffect, useState } from 'react';
import { PoemData } from './models/poem.data';
import { get as getPoems } from './services/poems.service';

export default function Routing() {
  const [poems, setPoems] = useState<PoemData[]>([]);

  useEffect(() => {
    getPoems().then(setPoems);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/words"><Poems poems={poems} /></Route>
        <Route exact path="/words/:slug" children={<Poem poems={poems} />} />
      </Switch>
    </Router>
  );
}