/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import StatsSummary from 'src/components/Strava/StatsSummary';
import RecentActivities from 'src/components/Strava/RecentActivities';

const StravaActivityList = (): JSX.Element => (
  <Container maxWidth="xl">
    <Grid
      container
      direction="row"
      justifyItems="center"
      spacing={2}
    >
      <Grid item xs={12} md={8} lg={8}>
        <RecentActivities />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <StatsSummary />
      </Grid>
    </Grid>
  </Container>
);

export default StravaActivityList;
