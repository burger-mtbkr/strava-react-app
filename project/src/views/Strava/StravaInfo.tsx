/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import StravaAllTimeStats from 'src/components/Strava/StravaAllTimeStats';
import StravaWeek from 'src/components/Strava/StravaWeekActivities';
import StravaConnect from 'src/components/Strava/StravaConnect';
import {
  getStravaAuthenticateResponse,
  getStravaAuthIsLoading,
} from 'src/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateWithStravaAction } from 'src/actions';

const widgets = (
  <Grid container direction="row" justifyItems="center">
    <Grid item xs={8} margin={1}>
      <StravaWeek />
    </Grid>
    <Grid item xs={3} margin={1}>
      <StravaAllTimeStats />
    </Grid>
  </Grid>
);

const StravaInfo = (): JSX.Element => {
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
      {authorized ? widgets : !isAuthLoading && <StravaConnect />}
    </Container>
  );
};

export default StravaInfo;
