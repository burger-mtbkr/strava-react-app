/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Typography, Grid } from '@mui/material';
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
    <>
      <Grid container item spacing={1} marginBottom={3}>
        <Grid item spacing={1}>
          <img src={athlete?.profile_medium} alt="profile" />
        </Grid>
        <Grid item>
          <Typography variant="h6">{name}</Typography>
          <Typography gutterBottom variant="caption">
            <Moment format="HH:mm on dddd, MMMM YYYY" local>
              {start_date}
            </Moment>
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={3} marginBottom={2}>
        <Grid item direction="column">
          <Typography gutterBottom variant="h6">
            {roundNumber(distance / 1000, 2)} km
          </Typography>
          <Typography gutterBottom variant="body1">
            Distance
          </Typography>
          <Typography gutterBottom variant="h6">
            {average_heartrate} bpm
          </Typography>
          <Typography gutterBottom variant="body1">
            Ave HR
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Typography gutterBottom variant="h6">
            {toHmsString(moving_time)}
          </Typography>
          <Typography gutterBottom variant="body1">
            Moving Time
          </Typography>
          <Typography gutterBottom variant="h6">
            {max_heartrate} bpm
          </Typography>
          <Typography gutterBottom variant="body1">
            Max HR
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Typography gutterBottom variant="h6">
            {total_elevation_gain} m
          </Typography>
          <Typography gutterBottom variant="body1">
            Elevation
          </Typography>
          <Typography gutterBottom variant="h6">
            {kilojoules}
          </Typography>
          <Typography gutterBottom variant="body1">
            Calories
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default StravaActivityDetail;
