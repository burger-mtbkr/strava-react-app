import { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import moment from 'moment';
import { getFirstDayOfCurrentWeek } from 'src/utils';
import { SummaryActivity } from 'src/models';

import { useDispatch, useSelector } from 'react-redux';
import { fetchStravaActivitiesAction } from 'src/actions';
import { getStravaActivitiesResponse } from 'src/selectors';

import ActivityList from './ActivityList';

const from = moment(getFirstDayOfCurrentWeek()).unix();
const to = moment(new Date()).unix();

const WeekActivities = (): JSX.Element => {
  const dispatch = useDispatch();
  const [activities, setActivities] = useState<
    Array<SummaryActivity> | undefined
  >(undefined);

  const stravaActivityResponse = useSelector(getStravaActivitiesResponse);

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
    <Paper>
      <Typography gutterBottom variant="h5">
        Current Week Activities
      </Typography>
      <ActivityList activities={activities} />
    </Paper>
  );
};

export default WeekActivities;
