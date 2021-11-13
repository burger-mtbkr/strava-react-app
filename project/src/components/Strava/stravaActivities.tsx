/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { IStravaActivity } from 'src/models';
import Moment from 'react-moment';
import {
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';
import { toHmsString, roundNumber } from 'src/utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStravaActivitiesAction } from 'src/actions';
import {
  getStravaActivitiesIsLoading,
  getStravaActivityResponse,
} from 'src/selectors';
import StravaSkeleton from './stravaSkeleton';

const from = moment().utc().subtract(30, 'days').unix();
const to = moment.utc().unix();

const StravaActivities = (): JSX.Element => {
  const dispatch = useDispatch();
  const [activities, setActivities] = useState<
    Array<IStravaActivity> | undefined
  >(undefined);

  const stravaActivityResponse = useSelector(getStravaActivityResponse);
  const isLoading = useSelector(getStravaActivitiesIsLoading);

  useEffect(() => {
    if (
      stravaActivityResponse?.isSuccessful &&
      stravaActivityResponse.activities
    ) {
      setActivities(stravaActivityResponse.activities);
    } else {
      setActivities([]);
    }
  }, [stravaActivityResponse]);

  useEffect(() => {
    dispatch(
      fetchStravaActivitiesAction({
        fromUnix: from,
        toUnix: to,
        page: 1,
        itemCount: 50,
      }),
    );
  }, []);

  const activityGridItem = (a: IStravaActivity, i: number) => (
    <>
      <ListItem key={i}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">{a.name}</Typography>
          <Typography gutterBottom variant="caption">
            <Moment format="DD-MMM-YYYY HH:mm" local>
              {a.start_date}
            </Moment>
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h5">
                  {roundNumber(a.distance / 1000, 2)} km
                </Typography>
                <Typography gutterBottom variant="h6">
                  {toHmsString(a.moving_time)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item spacing={2} xs>
              <Typography gutterBottom variant="body2">
                Ave HR: {a.average_heartrate} bpm
              </Typography>
              <Typography gutterBottom variant="body2">
                Max HR: {a.max_heartrate} bpm
              </Typography>
              <Typography variant="body2">Calories {a.kilojoules}</Typography>
            </Grid>
            <Grid item spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="body2">
                  Up: {a.total_elevation_gain} m
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );

  const noActivities = () => (
    <Typography variant="subtitle1">No activities to show.</Typography>
  );

  return (
    <Grid item>
      <Paper>
        <Typography gutterBottom variant="subtitle1">
          Latest Activities
        </Typography>
        <>
          {isLoading && <StravaSkeleton />}
          {!isLoading &&
            (!activities || activities?.length < 1) &&
            noActivities()}
          {!isLoading && activities && activities?.length > 0 && (
            <List>
              {activities
                .slice(0, 7)
                .map((a: IStravaActivity, i: number) => activityGridItem(a, i))}
            </List>
          )}
        </>
      </Paper>
    </Grid>
  );
};

export default StravaActivities;
