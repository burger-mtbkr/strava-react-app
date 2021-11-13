/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { ListItem, Typography, Grid, Divider } from '@mui/material';
import { toHmsString, roundNumber } from 'src/utils';
import { IStravaActivity } from 'src/models';
import Moment from 'react-moment';

interface IStravaActivityGridItemProps {
  a: IStravaActivity;
  i: number;
}

const ActivityItem = (props: IStravaActivityGridItemProps) => {
  const { a, i } = props;
  const {
    start_date,
    name,
    distance,
    moving_time,
    max_heartrate,
    average_heartrate,
    kilojoules,
    total_elevation_gain,
  } = a;

  return (
    <div key={i}>
      <ListItem>
        <Grid container>
          <Grid item xs={12} lg={12} marginBottom={1}>
            <Typography variant="body1">{name}</Typography>
            <Typography gutterBottom variant="caption">
              <Moment format="DD-MMM-YYYY HH:mm" local>
                {start_date}
              </Moment>
            </Typography>
          </Grid>
          <Grid container item>
            <Grid item xs={6}>
              <Typography gutterBottom variant="body2">
                {roundNumber(distance / 1000, 2)} km
              </Typography>
              <Typography gutterBottom variant="body2">
                {toHmsString(moving_time)}
              </Typography>
              <Typography variant="body2">Calories {kilojoules}</Typography>
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
        </Grid>
      </ListItem>
      <Divider />
    </div>
  );
};

export default ActivityItem;
