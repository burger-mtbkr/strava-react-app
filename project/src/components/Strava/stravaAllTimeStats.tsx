/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IAthleteStats, IStatTotals } from 'src/models';
import { Grid, List, ListItem, Paper, Typography } from '@mui/material';
import { roundNumber, toHmsString } from 'src/utils';
import StravaSkeleton from './stravaSkeleton';
import { authenticateStrava, getAthleteStats } from '../../api/stravaApi';

const statLayout = (data: IStatTotals): JSX.Element => (
  <List>
    <ListItem>
      <>
        <Typography variant="body1">Total distance:</Typography>
        <Typography variant="body1">
          {roundNumber(data.distance / 1000, 2)} km
        </Typography>
      </>
    </ListItem>
    <ListItem>
      <>
        <Typography variant="body1">Moving time:</Typography>
        <Typography variant="body1">{toHmsString(data.moving_time)}</Typography>
      </>
    </ListItem>
    <ListItem>
      <>
        <Typography variant="body1">Elevation gain:</Typography>
        <Typography variant="body1">
          {roundNumber(data.elevation_gain, 2)} m
        </Typography>
      </>
    </ListItem>
    <ListItem>
      <>
        <Typography variant="body1">Activity count:</Typography>
        <Typography variant="body1">{roundNumber(data.count, 2)}</Typography>
      </>
    </ListItem>
    {data.achievement_count ? (
      <ListItem>
        <>
          <Typography variant="body1">Achievement count:</Typography>
          <Typography variant="body1">{data.achievement_count}</Typography>
        </>
      </ListItem>
    ) : null}
  </List>
);

const StravaAllTimeStats = (): JSX.Element => {
  const [loading, setIsLoading] = useState(true);
  const [athleteStats, setAthleteStats] = useState<IAthleteStats | undefined>(
    undefined,
  );

  const loadStats = async () => {
    const authorized = await authenticateStrava();
    if (authorized) {
      const stats = await getAthleteStats();
      if (stats) {
        setAthleteStats(stats);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      await loadStats();
    })();
  }, []);

  return (
    <Grid item>
      <Paper>
        <Typography gutterBottom variant="subtitle1">
          All-time Stats
        </Typography>
        {loading ? (
          <StravaSkeleton />
        ) : (
          athleteStats && statLayout(athleteStats?.all_ride_totals)
        )}
      </Paper>
    </Grid>
  );
};

export default StravaAllTimeStats;
