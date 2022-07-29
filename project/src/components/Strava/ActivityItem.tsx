/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { ListItem, Typography, Grid, Divider } from '@mui/material';
import { toHmsString, roundNumber } from 'src/utils';
import { IStravaActivity, IStravaAthlete } from 'src/models';
import Moment from 'react-moment';
import { TestIds } from 'src/test/utils';

import MapControl from '../LeafletMap/LeafletMapControl';

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
      <ListItem data-testid={TestIds.activityItemComponent(activity.id)}>
        <Grid container padding={1}>
          <Grid container item marginBottom={1}>
            <Grid item xs={3} lg={2}>
              <img src={athlete?.profile_medium} alt="profile" />
            </Grid>
            <Grid item xs={9} lg={10}>
              <Typography variant="h6">{name}</Typography>
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
          <div style={{ height: '250px', width: '100%' }}>
            <MapControl {...activity} />
          </div>
          {/* <GoogleMapControl
            googleMapURL={googleScript}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div style={{ height: '250px', width: '100%' }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
            {...activity}
          /> */}
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default ActivityItem;
