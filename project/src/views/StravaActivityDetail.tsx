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
import StreamGraph from 'src/components/Strava/StreamGraph';
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
      {isLoading && (
        <Paper>
          <LoadingSkeleton />
        </Paper>
      )}
      {!isLoading && !activity && noActivityFound}
      {!isLoading && activity && (
        <Grid padding={2}>
          <Grid container item padding={1}>
            <Grid container direction="row">
              <Grid item xs={12} md={8} lg={9} marginBottom={3}>
                <MapControl
                  activity={activity}
                  style={{
                    height: '400px',
                    minWidth: '400px',
                    marginRight: '20px',
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                lg={3}
                className="no-left-padding"
                marginBottom={3}
              >
                <ActivityDetailStats {...activity} />
              </Grid>
            </Grid>
            {/* <Grid item xs={12} md={8} lg={9} className="no-left-padding">
              <StreamGraph
                activityDetail={activity}
                lineColour="#008000"
                parentBorderColour="#888777"
                title="Elevation Graph"
                streamType="altitude"
                highDomain={activity.elev_low}
                lowDomain={activity.elev_low}
              />
            </Grid> */}
            <Grid item xs={12} md={8} lg={9} className="no-left-padding">
              <StreamGraph
                activityDetail={activity}
                lineColour="#FF0000"
                parentBorderColour="#888777"
                title="Heart Rate"
                streamType="heartrate"
                highDomain={activity.max_heartrate}
                lowDomain={0}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default StravaActivityDetail;
