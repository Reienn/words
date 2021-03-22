import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Poems from './components/poems-list.component';
import Poem from './components/poem.component';

export default function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/poems" /></Route>
        <Route exact path="/poems"><Poems /></Route>
        <Route exact path="/poems/:id" children={<Poem />} />
      </Switch>
    </Router>
  );
}