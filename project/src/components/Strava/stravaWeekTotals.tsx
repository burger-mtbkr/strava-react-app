/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { IStravaActivity } from '../../models/strava/stravaActivity';
import dateUtil from '../../utils/dateUtil';
import numberUtil from '../../utils/number.util';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  activityTitle: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    display: 'block',
  },

  itemGrid: { margin: theme.spacing(0, 1, 2, 1) },
}));

const StravaWeekTotals = (activities: Array<IStravaActivity>): JSX.Element => {
  const classes = useStyles();

  const totalDistance = (): number => {
    let totalDist: number = 0.0;
    for (const i in activities) {
      const a: IStravaActivity = activities[i];
      totalDist += a.distance;
    }
    return numberUtil.round(totalDist / 1000, 2);
  };

  const totalElevation = (): number => {
    let totalElv: number = 0.0;
    for (const i in activities) {
      const a: IStravaActivity = activities[i];
      totalElv += a.total_elevation_gain;
    }
    return numberUtil.round(totalElv, 2);
  };

  const totalTime = (): string => {
    let time: number = 0;
    for (const i in activities) {
      const a: IStravaActivity = activities[i];
      time += a.moving_time;
    }
    return dateUtil.toHmString(time);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          <Grid item>
            <Typography variant="h6">{totalTime()}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">{totalDistance()} km</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">{totalElevation()} m</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StravaWeekTotals;
