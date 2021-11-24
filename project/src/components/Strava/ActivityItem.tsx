/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { ListItem, Typography, Grid, Divider } from '@mui/material';
import { toHmsString, roundNumber } from 'src/utils';
import { IStravaActivity, IStravaAthlete } from 'src/models';
import Moment from 'react-moment';
import StravaMap from './StravaMap';

const googleScript = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=initMap&v=weekly`;

interface IStravaActivityGridItemProps {
  activity: IStravaActivity;
  athlete: IStravaAthlete | undefined;
}

const ActivityItem = (props: IStravaActivityGridItemProps) => {
  const { activity, athlete } = props;
  const {
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
      <ListItem>
        <Grid container padding={1}>
          <Grid item xs={12} lg={12} marginBottom={1}>
            <Typography variant="body1">{name}</Typography>
            <Typography gutterBottom variant="caption">
              <Moment format="DD-MMM-YYYY HH:mm" local>
                {start_date}
              </Moment>
            </Typography>
            <Typography gutterBottom variant="caption">
              {athlete?.profile_medium}
            </Typography>
          </Grid>
          <Grid container item marginBottom={1}>
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

          <StravaMap
            googleMapURL={googleScript}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div style={{ height: '250px', width: '100%' }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
            activity={activity}
            zoom={11}
          />
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default ActivityItem;
