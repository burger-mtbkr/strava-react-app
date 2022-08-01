/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Typography, Grid, Container, Paper } from '@mui/material';
import { ActivityDetail } from 'src/models';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStravaActivityIsLoading,
  getStravaActivityResponse,
} from 'src/selectors';
import { useEffect, useState } from 'react';
import { fetchStravaActivityAction } from 'src/actions';
import LoadingSkeleton from 'src/components/Common/Skeleton';
import ActivityDetailStats from 'src/components/Strava/ActivityDetailStats';
import MapControl from '../components/LeafletMap/LeafletMapControl';

const StravaActivityDetail = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

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
    <Container maxWidth="xl">
      <Paper>
        {isLoading && <LoadingSkeleton />}
        {!isLoading && !activity && noActivityFound}
        {!isLoading && activity && (
          <Grid padding={2}>
            <Grid container padding={1}>
              <ActivityDetailStats {...activity} />
              {activity && (
                <MapControl
                  activity={activity}
                  style={{ height: '500px', width: '100%' }}
                />
              )}
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default StravaActivityDetail;
