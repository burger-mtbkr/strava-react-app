/* eslint-disable react-hooks/exhaustive-deps */

import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import { TestIds } from 'src/test/utils';
import StatsSummary from 'src/components/Strava/StatsSummary';

import RecentActivities from 'src/components/Strava/RecentActivities';

const StravaActivityList = (): JSX.Element => (
  <Container maxWidth="xl" data-testid={TestIds.stravaListComponent}>
    <Grid
      container
      direction="row"
      justifyItems="center"
      spacing={2}
      marginTop={10}
    >
      <Grid item xs={12} md={6} lg={6}>
        <RecentActivities />
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <StatsSummary />
      </Grid>
    </Grid>
  </Container>
);

export default StravaActivityList;
