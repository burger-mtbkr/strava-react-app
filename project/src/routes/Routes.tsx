import { Switch, Route } from 'react-router-dom';
import Home from 'src/views/Home/Home';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
