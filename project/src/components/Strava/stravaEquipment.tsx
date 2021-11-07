/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IStravaAthlete, IEquipment } from 'src/models';
import { List, ListItem, Typography, Grid, Paper } from '@mui/material';
import { roundNumber } from 'src/utils';
import StravaSkeleton from './stravaSkeleton';
import { authenticateStrava, getAthlete } from '../../api/stravaApi';

const equipmentList = (data: Array<IEquipment>): JSX.Element => (
  <List>
    <ListItem>
      {data.map((e: IEquipment, i: number) => (
        <div key={i}>
          <Typography variant="body1">{e.name}</Typography>
          <Typography variant="body1">
            {roundNumber(e.distance / 1000, 2)} km
          </Typography>
        </div>
      ))}
    </ListItem>
  </List>
);

const StravaEquipment = (): JSX.Element => {
  const [loading, setIsLoading] = useState(true);
  const [athlete, setAthlete] = useState<IStravaAthlete | undefined>(undefined);

  const loadStats = async () => {
    const authorized = await authenticateStrava();
    if (authorized) {
      const a = await getAthlete();
      if (a) {
        setAthlete(a || undefined);
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
    <>
      {loading ? (
        <StravaSkeleton />
      ) : (
        <>
          <Grid item>
            <Paper>
              <Typography gutterBottom variant="subtitle1">
                Bikes
              </Typography>
              {equipmentList(athlete?.bikes || [])}
            </Paper>
          </Grid>
        </>
      )}
    </>
  );
};

export default StravaEquipment;
