/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import StravaAllTimeStats from 'src/components/Strava/stravaAllTimeStats';
import StravaWeek from 'src/components/Strava/stravaWeekActivities';
import { authenticateStrava } from 'src/api/stravaApi';
import StravaConnect from 'src/components/Strava/stravaConnect';

const widgets = (
  <Grid container>
    <Grid item xs container direction="column">
      <StravaWeek />
    </Grid>
    <Grid item xs container direction="column">
      <Grid item>
        <StravaAllTimeStats />
      </Grid>
    </Grid>
  </Grid>
);

const StravaInfo = (): JSX.Element => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      const a = await authenticateStrava();
      setAuthorized(a);
      setLoading(false);
    })();
  }, []);

  return (
    <Container maxWidth="lg">
      {authorized ? widgets : !loading && <StravaConnect />}
    </Container>
  );
};

export default StravaInfo;
