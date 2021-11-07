/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, Paper, Grid } from '@material-ui/core';
import StravaSkeleton from './stravaSkeleton';
import { IAthleteStats, IStatTotals } from '../../models/strava/athleteStats';
import numberUtil from '../../utils/number.util';
import dateUtil from '../../utils/dateUtil';
import { authenticateStrava, getAthleteStats } from '../../api/stravaApi';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 420,
  },
  title: {
    textAlign: 'left',
    textDecoration: 'underline',
    display: 'inline',
  },
  valueTitle: {
    marginRight: theme.spacing(3),
    textDecoration: 'none',
    display: 'block',
  },
  valueText: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    display: 'block',
  },
  paper: {
    padding: theme.spacing(1),
    minWidth: '350px',
    minHeight: '250px',
  },
  underlined: {
    textDecoration: 'underline',
  },
  itemGrid: { margin: theme.spacing(0, 1, 2, 1) },
}));

const statLayout = (classes: any, data: IStatTotals): JSX.Element => {
  return (
    <List className={classes.root}>
      <ListItem>
        <Fragment>
          <Typography variant="body1" className={classes.valueTitle}>
            Total distance:
          </Typography>
          <Typography variant="body1" className={classes.valueText}>
            {numberUtil.round(data.distance / 1000, 2)} km
          </Typography>
        </Fragment>
      </ListItem>
      <ListItem>
        <Fragment>
          <Typography variant="body1" className={classes.valueTitle}>
            Moving time:
          </Typography>
          <Typography variant="body1" className={classes.valueText}>
            {dateUtil.toHmsString(data.moving_time)}
          </Typography>
        </Fragment>
      </ListItem>
      <ListItem>
        <Fragment>
          <Typography variant="body1" className={classes.valueTitle}>
            Elevation gain:
          </Typography>
          <Typography variant="body1" className={classes.valueText}>
            {numberUtil.round(data.elevation_gain, 2)} m
          </Typography>
        </Fragment>
      </ListItem>
      <ListItem>
        <Fragment>
          <Typography variant="body1" className={classes.valueTitle}>
            Activity count:
          </Typography>
          <Typography variant="body1" className={classes.valueText}>
            {numberUtil.round(data.count, 2)}
          </Typography>
        </Fragment>
      </ListItem>
      {data.achievement_count ? (
        <ListItem>
          <Fragment>
            <Typography variant="body1" className={classes.valueTitle}>
              Achievement count:
            </Typography>
            <Typography variant="body1" className={classes.valueText}>
              {data.achievement_count}
            </Typography>
          </Fragment>
        </ListItem>
      ) : null}
    </List>
  );
};

const StravaRecentStats = (): JSX.Element => {
  const classes = useStyles();
  const [loading, setIsLoading] = useState(true);
  const [athleteStats, setAthleteStats] = useState<IAthleteStats | undefined>(undefined);

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
    <Grid item className={classes.itemGrid}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="subtitle1" className={classes.underlined}>
          Recent Stats
        </Typography>
        {loading ? (
          <StravaSkeleton />
        ) : (
          athleteStats && statLayout(classes, athleteStats?.recent_ride_totals)
        )}
      </Paper>
    </Grid>
  );
};

export default StravaRecentStats;
