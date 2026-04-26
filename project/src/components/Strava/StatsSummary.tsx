/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IAthleteStats } from 'src/models';
import { Box, Divider, Paper, Typography } from '@mui/material';

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
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
        textAlign: 'left',
      }}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        athleteStats && (
          <>
            <Box sx={{ mb: 0.5 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                }}
              >
                Last 4 weeks
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.25 }}>
                Recent Stats
              </Typography>
            </Box>
            <Stats {...athleteStats.recent_ride_totals} />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 0.5 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                }}
              >
                Career
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.25 }}>
                All-time Stats
              </Typography>
            </Box>
            <Stats {...athleteStats.all_ride_totals} />
          </>
        )
      )}
    </Paper>
  );
};

export default StatsSummary;
