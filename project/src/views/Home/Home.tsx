import Container from '@mui/material/Container';
import { TestIds } from 'src/utils';
import StravaInfo from '../Strava/stravaInfo';

const Home = (): JSX.Element => (
  <Container maxWidth="lg" data-testid={TestIds.homeViewComponent}>
    <StravaInfo />
  </Container>
);

export default Home;