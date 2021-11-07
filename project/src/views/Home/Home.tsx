import Container from '@mui/material/Container';
import { TestIds } from 'src/utils';
import { Typography } from '@mui/material';

const Home = (): JSX.Element => (
  <Container maxWidth="lg" data-testid={TestIds.homeViewComponent}>
    <Typography>Strava app coming soon...</Typography>
  </Container>
);

export default Home;
