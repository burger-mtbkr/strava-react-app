/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Typography, Grid } from '@mui/material';
import { toHmsString, roundNumber } from 'src/utils';
import { SummaryActivity, StravaAthlete } from 'src/models';
import Moment from 'react-moment';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAthlete } from 'src/selectors';

const ActivityListItemStats = (activity: SummaryActivity) => {
  const athlete: StravaAthlete | undefined = useSelector(getAthlete);
  const {
    id,
    start_date,
    name,
    distance,
    moving_time,
    max_heartrate,
    average_heartrate,
    kilojoules,
    total_elevation_gain,
  } = activity;

  return (
    <>
      <Grid container item marginBottom={1}>
        <Grid item xs={3} lg={2}>
          <img src={athlete?.profile_medium} alt="profile" />
        </Grid>
        <Grid item xs={9} lg={10}>
          <Link to={`/activity/${id}`} className="activity-link">
            <Typography variant="h6">{name}</Typography>
          </Link>
          <Typography gutterBottom variant="caption">
            <Moment format="DD-MMM-YYYY HH:mm" local>
              {start_date}
            </Moment>
          </Typography>
        </Grid>
      </Grid>
      <Grid container item marginBottom={1}>
        <Grid item xs={6}>
          <Typography gutterBottom variant="body2">
            Distance: {roundNumber(distance / 1000, 2)} km
          </Typography>
          <Typography gutterBottom variant="body2">
            Moving Time: {toHmsString(moving_time)}
          </Typography>
          <Typography variant="body2">Calories: {kilojoules}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="body2">
            Ave HR: {average_heartrate} bpm
          </Typography>
          <Typography gutterBottom variant="body2">
            Max HR: {max_heartrate} bpm
          </Typography>
          <Typography variant="body2">
            Elevation: {total_elevation_gain} m
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ActivityListItemStats;
