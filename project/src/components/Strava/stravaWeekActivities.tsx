/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Typography,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import moment from 'moment';
import { toHmsString, getFirstDayOfCurrentWeek, roundNumber } from 'src/utils';
import { IStravaActivity } from 'src/models';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStravaActivitiesAction } from 'src/actions';
import {
  getStravaActivitiesIsLoading,
  getStravaActivityResponse,
} from 'src/selectors';
import StravaWeekTotals from './stravaWeekTotals';
import StravaSkeleton from './stravaSkeleton';

const noActivities = (
  <Typography variant="subtitle1">No activities to show.</Typography>
);

const activityGridItem = (a: IStravaActivity, i: number) => (
  <div key={i}>
    <ListItem>
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
              <Typography variant="h6">
                {roundNumber(a.distance / 1000, 2)} km
              </Typography>
              <Typography gutterBottom variant="body1">
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
  </div>
);
const now = new Date();
const firstDay: Date = getFirstDayOfCurrentWeek();
const from = moment(firstDay).unix();
const to = moment(now).unix();

const StravaWeekActivities = (): JSX.Element => {
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
  }, [dispatch]);

  return (
    <Grid item>
      <Paper>
        <Typography gutterBottom variant="subtitle1">
          Current Week Activities
        </Typography>
        <>
          {isLoading ? (
            <StravaSkeleton />
          ) : !activities || activities?.length < 1 ? (
            noActivities
          ) : (
            <>
              <StravaWeekTotals {...activities} />
              <List>
                {activities
                  .slice(0, 7)
                  .map((a: IStravaActivity, i: number) =>
                    activityGridItem(a, i),
                  )}
              </List>
            </>
          )}
        </>
      </Paper>
    </Grid>
  );
};

export default StravaWeekActivities;
