/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/exhaustive-deps */

import { Grid, Typography } from '@mui/material';
import { IStravaActivity } from 'src/models';
import { toHmString, roundNumber } from 'src/utils';

const totalDistance = (activities: Array<IStravaActivity>): number => {
  let totalDist = 0.0;
  for (const i in activities) {
    const a: IStravaActivity = activities[i];
    totalDist += a.distance;
  }
  return roundNumber(totalDist / 1000, 2);
};

const totalElevation = (activities: Array<IStravaActivity>): number => {
  let totalElv = 0.0;
  for (const i in activities) {
    const a: IStravaActivity = activities[i];
    totalElv += a.total_elevation_gain;
  }
  return roundNumber(totalElv, 2);
};

const totalTime = (activities: Array<IStravaActivity>): string => {
  let time = 0;
  for (const i in activities) {
    const a: IStravaActivity = activities[i];
    time += a.moving_time;
  }
  return toHmString(time);
};

const StravaWeekTotals = (activities: Array<IStravaActivity>): JSX.Element => (
  <Grid container justifyItems="center" justifyContent="center" direction="row">
    <Grid item margin={1}>
      <Typography variant="h6">{totalTime(activities)}</Typography>
    </Grid>
    <Grid item margin={1}>
      <Typography variant="h6">{totalDistance(activities)} km</Typography>
    </Grid>
    <Grid item margin={1}>
      <Typography variant="h6">{totalElevation(activities)} m</Typography>
    </Grid>
  </Grid>
);

export default StravaWeekTotals;
