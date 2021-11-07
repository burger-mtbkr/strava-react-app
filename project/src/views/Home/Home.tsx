import Container from '@mui/material/Container';
import { TestIds } from 'src/utils';
import { Typography } from '@mui/material';
import StravaInfo from '../Strava/stravaInfo';

const Home = (): JSX.Element => (
  <Container maxWidth="lg" data-testid={TestIds.homeViewComponent}>
    <Typography>Strava app coming soon...</Typography>
    <StravaInfo />
  </Container>
);

export default Home;
