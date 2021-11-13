/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import StatsSummary from 'src/components/Strava/StatsSummary';
import StravaWeek from 'src/components/Strava/WeekActivities';
import Connect from 'src/components/Strava/Connect';
import {
  getStravaAuthenticateResponse,
  getStravaAuthIsLoading,
} from 'src/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateWithStravaAction } from 'src/actions';

const widgets = (
  <Grid container direction="row" justifyItems="center" spacing={2}>
    <Grid item xs={12} lg={9}>
      <StravaWeek />
    </Grid>
    <Grid item xs={12} lg={3}>
      <StatsSummary />
    </Grid>
  </Grid>
);

const StravaLayout = (): JSX.Element => {
  const dispatch = useDispatch();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const isAuthLoading = useSelector(getStravaAuthIsLoading);
  const authResponse = useSelector(getStravaAuthenticateResponse);

  useEffect(() => {
    if (authResponse?.isSuccessful && authResponse.stravaSession) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [authResponse]);

  useEffect(() => {
    dispatch(authenticateWithStravaAction());
  }, []);

  return (
    <Container maxWidth="xl">
      {authorized ? widgets : !isAuthLoading && <Connect />}
    </Container>
  );
};

export default StravaLayout;
