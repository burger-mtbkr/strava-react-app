import { Switch, Route } from 'react-router-dom';
import StravaActivityList from 'src/views/StravaActivityList';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <StravaActivityList />
    </Route>
  </Switch>
);

export default Routes;
