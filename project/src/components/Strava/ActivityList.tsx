/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { SummaryActivity } from 'src/models';
import { List, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStravaAthleteAction } from 'src/actions';
import { getStravaActivitiesIsLoading } from 'src/selectors';
import LoadingSkeleton from '../Common/Skeleton';
import ActivityListItem from './ActivityListItem';
import ActivityListTotals from './ActivityListTotals';

const noActivities = (
  <Typography variant="subtitle1">No activities to show.</Typography>
);

type Props = {
  activities: Array<SummaryActivity> | undefined;
  title: string;
};

const ActivityList = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { activities, title } = props;

  const isLoading = useSelector(getStravaActivitiesIsLoading);

  useEffect(() => {
    dispatch(fetchStravaAthleteAction());
  }, []);

  return (
    <>
      {isLoading && (
        <Paper>
          <LoadingSkeleton />
        </Paper>
      )}
      {!isLoading && (!activities || activities?.length < 1) && noActivities}
      {!isLoading && activities && activities?.length > 0 && (
        <>
          <Paper>
            <Typography gutterBottom variant="h5">
              {title}
            </Typography>
            <ActivityListTotals {...activities} />
          </Paper>
          <List>
            {activities.slice(0, 7).map((a: SummaryActivity, i: number) => (
              <ActivityListItem {...a} key={i} />
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default ActivityList;
