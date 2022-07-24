/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { IStravaActivity, IStravaAthlete } from 'src/models';
import { Grid, List, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStravaActivitiesAction,
  fetchStravaAthleteAction,
} from 'src/actions';
import {
  getStravaActivitiesIsLoading,
  getStravaActivityResponse,
  getStravaAthleteResponse,
} from 'src/selectors';
import LoadingSkeleton from '../Common/Skeleton';
import ActivityItem from './ActivityItem';
import ActivityListTotals from './ActivityListTotals';

const from = moment().utc().subtract(30, 'days').unix();
const to = moment.utc().unix();

const Activities = (): JSX.Element => {
  const dispatch = useDispatch();
  const [activities, setActivities] = useState<
    Array<IStravaActivity> | undefined
  >(undefined);

  const [athlete, setAthlete] = useState<IStravaAthlete | undefined>(undefined);
  const athleteResponse = useSelector(getStravaAthleteResponse);
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
    if (athleteResponse?.isSuccessful && athleteResponse.athlete) {
      setAthlete(athleteResponse.athlete);
    } else {
      setAthlete(undefined);
    }
  }, [athleteResponse]);

  useEffect(() => {
    dispatch(
      fetchStravaActivitiesAction({
        fromUnix: from,
        toUnix: to,
        page: 1,
        itemCount: 5,
      }),
    );
    dispatch(fetchStravaAthleteAction());
  }, []);

  const noActivities = (
    <Typography variant="subtitle1">No activities to show.</Typography>
  );

  return (
    <Grid item>
      <Paper>
        <Typography gutterBottom variant="h5">
          Latest Activities
        </Typography>
        <>
          {isLoading && <LoadingSkeleton />}
          {!isLoading &&
            (!activities || activities?.length < 1) &&
            noActivities}
          {!isLoading && activities && activities?.length > 0 && (
            <>
              <ActivityListTotals {...activities} />
              <List>
                {activities.slice(0, 7).map((a: IStravaActivity, i: number) => (
                  <ActivityItem activity={a} athlete={athlete} key={i} />
                ))}
              </List>
            </>
          )}
        </>
      </Paper>
    </Grid>
  );
};

export default Activities;
