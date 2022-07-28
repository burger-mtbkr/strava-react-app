/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { IStravaActivity } from 'src/models';
import { Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStravaActivitiesAction } from 'src/actions';
import { getStravaActivityResponse } from 'src/selectors';

import ActivityList from './ActivityList';

const from = moment().utc().subtract(30, 'days').unix();
const to = moment.utc().unix();

const RecentActivities = (): JSX.Element => {
  const dispatch = useDispatch();
  const [activities, setActivities] = useState<
    Array<IStravaActivity> | undefined
  >(undefined);

  const stravaActivityResponse = useSelector(getStravaActivityResponse);

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
        itemCount: 7,
      }),
    );
  }, [dispatch]);

  return (
    <Grid item>
      <Paper>
        <Typography gutterBottom variant="h5">
          Recent Activities
        </Typography>
        <ActivityList activities={activities} />
      </Paper>
    </Grid>
  );
};

export default RecentActivities;
