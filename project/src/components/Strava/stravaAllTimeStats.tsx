/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IAthleteStats } from 'src/models';
import { Grid, Paper, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  getStravaAthleteStatsIsLoading,
  getStravaAthleteStatsResponse,
} from 'src/selectors';
import { fetchStravaAthleteStatsAction } from 'src/actions';
import StravaSkeleton from './stravaSkeleton';
import StravaStats from './stravaStats';

const StravaAllTimeStats = (): JSX.Element => {
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
    <Grid item>
      <Paper>
        {isLoading ? (
          <StravaSkeleton />
        ) : (
          athleteStats && (
            <>
              <Typography gutterBottom variant="subtitle1">
                All-time Stats
              </Typography>
              <StravaStats {...athleteStats?.all_ride_totals} />
              <Typography gutterBottom variant="subtitle1">
                Recent Stats
              </Typography>
              <StravaStats {...athleteStats?.recent_ride_totals} />
            </>
          )
        )}
      </Paper>
    </Grid>
  );
};

export default StravaAllTimeStats;
