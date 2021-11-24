import Container from '@mui/material/Container';
import { TestIds } from 'src/test/utils';
import StravaLayout from '../Strava/StravaLayout';

const Home = (): JSX.Element => (
  <Container maxWidth="lg" data-testid={TestIds.homeViewComponent}>
    <StravaLayout />
  </Container>
);

export default Home;
