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

const ActivityGridItem = (props: IStravaActivityGridItemProps) => {
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
        <Grid item xs={12}>
          <Typography variant="h6">{name}</Typography>
          <Typography gutterBottom variant="caption">
            <Moment format="DD-MMM-YYYY HH:mm" local>
              {start_date}
            </Moment>
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="body2">
                  {roundNumber(distance / 1000, 2)} km
                </Typography>
                <Typography gutterBottom variant="body2">
                  {toHmsString(moving_time)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item spacing={2} xs>
              <Typography gutterBottom variant="body2">
                Ave HR: {average_heartrate} bpm
              </Typography>
              <Typography gutterBottom variant="body2">
                Max HR: {max_heartrate} bpm
              </Typography>
              <Typography variant="body2">Calories {kilojoules}</Typography>
            </Grid>
            <Grid item spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="body2">
                  Up: {total_elevation_gain} m
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </div>
  );
};

export default ActivityGridItem;
