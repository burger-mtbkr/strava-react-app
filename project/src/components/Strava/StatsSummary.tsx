/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IAthleteStats } from 'src/models';
import { Paper, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  getStravaAthleteStatsIsLoading,
  getStravaAthleteStatsResponse,
} from 'src/selectors';
import { fetchStravaAthleteStatsAction } from 'src/actions';
import LoadingSkeleton from '../Common/Skeleton';
import Stats from './Stats';

const StatsSummary = (): JSX.Element => {
  const dispatch = useDispatch();
  const stravaAthleteStatsResponse = useSelector(getStravaAthleteStatsResponse);
  const isLoading = useSelector(getStravaAthleteStatsIsLoading);
  const [athleteStats, setAthleteStats] = useState<IAthleteStats | undefined>(
    undefined,
  );

  useEffect(() => {
    if (
      stravaAthleteStatsResponse?.isSuccessful &&
      stravaAthleteStatsResponse.athleteStats
    ) {
      setAthleteStats(stravaAthleteStatsResponse.athleteStats);
    } else {
      setAthleteStats(undefined);
    }
  }, [stravaAthleteStatsResponse]);

  useEffect(() => {
    dispatch(fetchStravaAthleteStatsAction());
  }, [dispatch]);
  return (
    <Paper>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        athleteStats && (
          <>
            <Typography gutterBottom variant="h6">
              Recent Stats
            </Typography>
            <Stats {...athleteStats?.recent_ride_totals} />
            <Typography gutterBottom variant="h6">
              All-time Stats
            </Typography>
            <Stats {...athleteStats?.all_ride_totals} />
          </>
        )
      )}
    </Paper>
  );
};

export default StatsSummary;
