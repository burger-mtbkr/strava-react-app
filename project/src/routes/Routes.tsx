import { Routes as Switch, Route } from 'react-router-dom';
import StravaActivityDetail from 'src/views/StravaActivityDetail';
import StravaActivityList from 'src/views/StravaActivityList';

const Routes = () => (
  <Switch>
    <Route element={<StravaActivityList />} path="/" />
    <Route element={<StravaActivityDetail />} path="/activity/:id" />
  </Switch>
);

export default Routes;
