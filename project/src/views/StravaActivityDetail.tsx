/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Typography, Grid } from '@mui/material';
import { toHmsString, roundNumber } from 'src/utils';
import { StravaAthlete, ActivityDetail } from 'src/models';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAthlete,
  getStravaActivityIsLoading,
  getStravaActivityResponse,
} from 'src/selectors';
import { useEffect, useState } from 'react';
import { fetchStravaActivityAction } from 'src/actions';
import LoadingSkeleton from 'src/components/Common/Skeleton';
import MapControl from '../components/LeafletMap/LeafletMapControl';

const StravaActivityDetail = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const athlete: StravaAthlete | undefined = useSelector(getAthlete);

  const [activity, setActivity] = useState<ActivityDetail | undefined>(
    undefined,
  );

  const stravaActivityResponse = useSelector(getStravaActivityResponse);
  const isLoading = useSelector(getStravaActivityIsLoading);

  useEffect(() => {
    dispatch(fetchStravaActivityAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      stravaActivityResponse?.isSuccessful &&
      stravaActivityResponse.activity
    ) {
      setActivity(stravaActivityResponse.activity);
    } else {
      setActivity(undefined);
    }
  }, [stravaActivityResponse]);

  const noActivityFound = (
    <Typography
      variant="h4"
      color="red"
    >{`No activity found for id: ${id}`}</Typography>
  );

  return (
    <>
      {isLoading && <LoadingSkeleton />}
      {!isLoading && !activity && noActivityFound}
      {!isLoading && activity && (
        <Grid padding={2}>
          <Grid container padding={1}>
            <Grid container item spacing={1} marginBottom={3}>
              <Grid item spacing={1}>
                <img src={athlete?.profile_medium} alt="profile" />
              </Grid>
              <Grid item>
                <Typography variant="h6">{activity.name}</Typography>
                <Typography gutterBottom variant="caption">
                  <Moment format="HH:mm on dddd, MMMM YYYY" local>
                    {activity.start_date}
                  </Moment>
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={3} marginBottom={2}>
              <Grid item direction="column">
                <Typography gutterBottom variant="h6">
                  {roundNumber(activity.distance / 1000, 2)} km
                </Typography>
                <Typography gutterBottom variant="body1">
                  Distance
                </Typography>
                <Typography gutterBottom variant="h6">
                  {activity.average_heartrate} bpm
                </Typography>
                <Typography gutterBottom variant="body1">
                  Ave HR
                </Typography>
              </Grid>
              <Grid item direction="column">
                <Typography gutterBottom variant="h6">
                  {toHmsString(activity.moving_time)}
                </Typography>
                <Typography gutterBottom variant="body1">
                  Moving Time
                </Typography>
                <Typography gutterBottom variant="h6">
                  {activity.max_heartrate} bpm
                </Typography>
                <Typography gutterBottom variant="body1">
                  Max HR
                </Typography>
              </Grid>
              <Grid item direction="column">
                <Typography gutterBottom variant="h6">
                  {activity.total_elevation_gain} m
                </Typography>
                <Typography gutterBottom variant="body1">
                  Elevation
                </Typography>
                <Typography gutterBottom variant="h6">
                  {activity.kilojoules}
                </Typography>
                <Typography gutterBottom variant="body1">
                  Calories
                </Typography>
              </Grid>
            </Grid>
            {activity && (
              <MapControl
                activity={activity}
                style={{ height: '500px', width: '100%' }}
                zoom={11}
              />
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default StravaActivityDetail;
