/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, Grid, Divider, Paper } from '@material-ui/core';
import StravaSkeleton from './stravaSkeleton';
import moment from 'moment';
import dateUtil from '../../utils/dateUtil';
import numberUtil from '../../utils/number.util';
import { IStravaActivity } from '../../models/strava/stravaActivity';
import StravaWeekTotatals from './stravaWeekTotals';
import Moment from 'react-moment';
import { authenticateStrava, getActivities } from '../../api/stravaApi';

const useStyles = makeStyles(theme => ({
  gridItemRoot: {
    flexGrow: 1,
    maxWidth: 420,
  },
  paper: {
    padding: theme.spacing(1),
    minWidth: '350px',
    minHeight: '250px',
  },
  underlined: {
    textDecoration: 'underline',
  },
  activityTitle: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    display: 'block',
  },
  activityDate: {
    fontSize: 'xsmall',
    color: '#757575',
  },
  activityText: {
    fontSize: 'xsmall',
  },
  itemGrid: { margin: theme.spacing(0, 1, 2, 1) },
}));

const noActivities = (
  <Fragment>
    <Typography variant="subtitle1">No activities to show.</Typography>
  </Fragment>
);

const activityGridItem = (classes: any, a: IStravaActivity, i: number) => {
  return (
    <div key={i}>
      <ListItem>
        <div className={classes.gridItemRoot}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" className={classes.activityTitle}>
              {a.name}
            </Typography>
            <Typography gutterBottom variant="caption" className={classes.activityDate}>
              <Moment format="DD-MMM-YYYY HH:mm" local>
                {a.start_date}
              </Moment>
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="h6">{numberUtil.round(a.distance / 1000, 2)} km</Typography>
                  <Typography gutterBottom variant="body1">
                    {dateUtil.toHmsString(a.moving_time)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item spacing={2} className={classes.activityText} xs>
                <Typography gutterBottom variant="body2">
                  Ave HR: {a.average_heartrate} bpm
                </Typography>
                <Typography gutterBottom variant="body2">
                  Max HR: {a.max_heartrate} bpm
                </Typography>
                <Typography variant="body2">Calories {a.kilojoules}</Typography>
              </Grid>
              <Grid item spacing={2} className={classes.activityText}>
                <Grid item xs>
                  <Typography gutterBottom variant="body2">
                    Up: {a.total_elevation_gain} m
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ListItem>
      <Divider />
    </div>
  );
};

const StravaWeekActivities = (): JSX.Element => {
  const classes = useStyles();
  const [loading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<Array<IStravaActivity> | undefined>(undefined);

  const loadActivities = async () => {
    const authorized = await authenticateStrava();
    if (authorized) {
      const now = new Date();
      const firstDay: Date = dateUtil.getFirstDayOfCurrentWeek();
      const from = moment(firstDay).unix();
      const to = moment(now).unix();

      const a = await getActivities(from, to, 1, 50);

      if (a && a.length > 0) {
        setActivities(a);
      }

      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      await loadActivities();
    })();
  }, []);

  return (
    <Grid item className={classes.itemGrid}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="subtitle1" className={classes.underlined}>
          Current Week Activities
        </Typography>
        <Fragment>
          {loading ? (
            <StravaSkeleton />
          ) : !activities || activities?.length < 1 ? (
            noActivities
          ) : (
            <Fragment>
              <StravaWeekTotatals {...activities} />
              <List>
                {activities
                  .slice(0, 7)
                  .map((a: IStravaActivity, i: number) => activityGridItem(classes, a, i))}
              </List>
            </Fragment>
          )}
        </Fragment>
      </Paper>
    </Grid>
  );
};

export default StravaWeekActivities;
