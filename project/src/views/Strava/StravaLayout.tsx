/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

import StatsSummary from 'src/components/Strava/StatsSummary';
import Connect from 'src/components/Strava/Connect';
import {
  getStravaAuthenticateResponse,
  getStravaAuthIsLoading,
} from 'src/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateWithStravaAction } from 'src/actions';
import Activities from 'src/components/Strava/Activities';
import { useQuery } from 'src/hooks';

const widgets = (
  <Grid
    container
    direction="row"
    justifyItems="center"
    spacing={2}
    marginTop={10}
  >
    <Grid item xs={12} md={6} lg={6}>
      <Activities />
    </Grid>
    <Grid item xs={12} md={3} lg={3}>
      <StatsSummary />
    </Grid>
  </Grid>
);

const StravaLayout = (): JSX.Element => {
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
  }, [stravaSession]);

  useEffect(() => {
    dispatch(authenticateWithStravaAction(code || undefined));
  }, []);

  return <>{authorized ? widgets : !isAuthLoading && <Connect />}</>;
};

export default StravaLayout;
