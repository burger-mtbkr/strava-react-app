import { useEffect, useState } from 'react';
import { List, Typography, Paper } from '@mui/material';
import moment from 'moment';
import { getFirstDayOfCurrentWeek } from 'src/utils';
import { IStravaActivity } from 'src/models';

import { useDispatch, useSelector } from 'react-redux';
import { fetchStravaActivitiesAction } from 'src/actions';
import {
  getStravaActivitiesIsLoading,
  getStravaActivityResponse,
} from 'src/selectors';
import ActivityListTotals from './ActivityListTotals';
import LoadingSkeleton from './Skeleton';
import ActivityItem from './ActivityItem';

const noActivities = (
  <Typography variant="subtitle1">No activities to show.</Typography>
);

const now = new Date();
const firstDay: Date = getFirstDayOfCurrentWeek();
const from = moment(firstDay).unix();
const to = moment(now).unix();

const WeekActivities = (): JSX.Element => {
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
    <Paper>
      <Typography gutterBottom variant="h5">
        Current Week Activities
      </Typography>
      <>
        {isLoading && <LoadingSkeleton />}
        {!isLoading && (!activities || activities?.length < 1) && noActivities}
        {!isLoading && activities && activities?.length > 0 && (
          <>
            <ActivityListTotals {...activities} />
            <List>
              {activities.slice(0, 7).map((a: IStravaActivity, i: number) => (
                <ActivityItem activity={a} key={i} />
              ))}
            </List>
          </>
        )}
      </>
    </Paper>
  );
};

export default WeekActivities;