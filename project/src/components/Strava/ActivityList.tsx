/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { SummaryActivity } from 'src/models';
import { Box, Paper, Stack, Typography } from '@mui/material';
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
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <LoadingSkeleton />
        </Paper>
      )}
      {!isLoading && (!activities || activities?.length < 1) && noActivities}
      {!isLoading && activities && activities?.length > 0 && (
        <Stack spacing={2}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Totals for activities shown below
            </Typography>
            <ActivityListTotals activities={activities} />
          </Paper>
          <Box component="div">
            {activities.slice(0, 7).map((a: SummaryActivity) => (
              <ActivityListItem {...a} key={a.id} />
            ))}
          </Box>
        </Stack>
      )}
    </>
  );
};

export default ActivityList;
