/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { IStravaActivity } from 'src/models';
import { Grid, List, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStravaActivitiesAction } from 'src/actions';
import {
  getStravaActivitiesIsLoading,
  getStravaActivityResponse,
} from 'src/selectors';
import LoadingSkeleton from './Skeleton';
import ActivityGridItem from './ActivityGridItem';

const from = moment().utc().subtract(30, 'days').unix();
const to = moment.utc().unix();

const Activities = (): JSX.Element => {
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
          {isLoading && <LoadingSkeleton />}
          {!isLoading &&
            (!activities || activities?.length < 1) &&
            noActivities()}
          {!isLoading && activities && activities?.length > 0 && (
            <List>
              {activities.slice(0, 7).map((a: IStravaActivity, i: number) => (
                <ActivityGridItem a={a} i={i} />
              ))}
            </List>
          )}
        </>
      </Paper>
    </Grid>
  );
};

export default Activities;
