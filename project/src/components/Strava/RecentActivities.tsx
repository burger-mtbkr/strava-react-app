/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { SummaryActivity } from 'src/models';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStravaActivitiesAction } from 'src/actions';
import { getStravaActivitiesResponse } from 'src/selectors';

import ActivityList from './ActivityList';

const from = moment().utc().subtract(30, 'days').unix();
const to = moment.utc().unix();

const RecentActivities = (): JSX.Element => {
  const dispatch = useDispatch();
  const [activities, setActivities] = useState<
    Array<SummaryActivity> | undefined
  >(undefined);

  const stravaActivitiesResponse = useSelector(getStravaActivitiesResponse);

  useEffect(() => {
    if (
      stravaActivitiesResponse?.isSuccessful &&
      stravaActivitiesResponse.activities
    ) {
      setActivities(stravaActivitiesResponse.activities);
    } else {
      setActivities([]);
    }
  }, [stravaActivitiesResponse]);

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
      <ActivityList activities={activities} title="Recent Activities" />
    </Grid>
  );
};

export default RecentActivities;
