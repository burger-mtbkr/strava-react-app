import { Typography, Grid, Container } from '@mui/material';
import { toHmsString, roundNumber } from 'src/utils';
import { StravaAthlete, ActivityDetail } from 'src/models';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { getAthlete } from 'src/selectors';

const StravaActivityDetail = (activity: ActivityDetail) => {
  const athlete: StravaAthlete | undefined = useSelector(getAthlete);
  const {
    name,
    start_date,
    distance,
    average_heartrate,
    moving_time,
    max_heartrate,
    total_elevation_gain,
    kilojoules,
  } = activity;

  return (
    <Container
      className="no-left-padding"
      sx={{
        minWidth: 450,
      }}
    >
      <Grid item container direction="row" marginBottom={2}>
        <Grid item marginRight={2}>
          <img src={athlete?.profile_medium} alt="profile" />
        </Grid>
        <Grid item textAlign="start" marginBottom={1}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="caption" color="#7a7a7a">
            <Moment format="HH:mm on dddd, MMMM YYYY" local>
              {start_date}
            </Moment>
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={3}>
        <Grid item direction="column">
          <Typography variant="h6">
            {roundNumber(distance / 1000, 2)} km
          </Typography>
          <Typography gutterBottom variant="body2" color="#7a7a7a">
            Distance
          </Typography>
          <Typography variant="h6">{average_heartrate} bpm</Typography>
          <Typography gutterBottom variant="body2" color="#7a7a7a">
            Ave HR
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Typography variant="h6">{toHmsString(moving_time)}</Typography>
          <Typography gutterBottom variant="body2" color="#7a7a7a">
            Moving Time
          </Typography>
          <Typography variant="h6">{max_heartrate} bpm</Typography>
          <Typography gutterBottom variant="body2" color="#7a7a7a">
            Max HR
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Typography variant="h6">{total_elevation_gain} m</Typography>
          <Typography gutterBottom variant="body2" color="#7a7a7a">
            Elevation
          </Typography>
          <Typography variant="h6">{kilojoules}</Typography>
          <Typography gutterBottom variant="body2" color="#7a7a7a">
            Calories
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StravaActivityDetail;
