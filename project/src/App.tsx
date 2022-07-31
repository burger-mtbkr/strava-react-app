import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Connect from 'src/components/Strava/Connect';
import {
  getStravaAuthenticateResponse,
  getStravaAuthIsLoading,
} from 'src/selectors';

import { authenticateWithStravaAction } from 'src/actions';

import { useQuery } from 'src/hooks';
import Routes from './redux/routes/Routes';
import Header from './components/Header/Header';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery(location);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const isAuthLoading = useSelector(getStravaAuthIsLoading);
  const authResponse = useSelector(getStravaAuthenticateResponse);
  const code = query.get('code');

  const { isSuccessful, stravaSession } =
    authResponse !== undefined
      ? authResponse
      : {
          isSuccessful: false,
          stravaSession: undefined,
        };

  useEffect(() => {
    if (isSuccessful && stravaSession) {
      if (code) {
        window.location.assign('http://localhost:3000/');
      }
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [code, isSuccessful, stravaSession]);

  useEffect(() => {
    dispatch(authenticateWithStravaAction(code || undefined));
  }, [code, dispatch]);

  return (
    <>
      <Header />
      <div className="App">
        {authorized ? <Routes /> : !isAuthLoading && <Connect />}
      </div>
    </>
  );
};

export default App;
