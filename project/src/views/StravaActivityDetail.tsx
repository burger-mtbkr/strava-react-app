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
import {
  fetchActivityStreamAction,
  fetchStravaActivityAction,
} from 'src/actions';
import LoadingSkeleton from 'src/components/Common/Skeleton';
import ActivityDetailStats from 'src/components/Strava/ActivityDetailStats';
import StreamAreaGraph from 'src/components/Strava/StreamAreaGraph';
import StreamLineGraph from 'src/components/Strava/StreamLineGraph';
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

  useEffect(() => {
    dispatch(
      fetchActivityStreamAction({
        id,
        types: ['altitude', 'heartrate', 'temp', 'cadence'],
      }),
    );
  }, [dispatch, id]);

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
            <Grid container direction="row" spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} md={8} lg={9} marginBottom={0}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
                    height: '100%',
                    minHeight: 400,
                  }}
                >
                  <MapControl
                    activity={activity}
                    style={{
                      height: '400px',
                      width: '100%',
                      minWidth: 'min(100%, 400px)',
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3} marginBottom={0}>
                <ActivityDetailStats {...activity} />
              </Grid>
            </Grid>
            <Grid item xs={12} md={8} lg={9} className="no-left-padding">
              <StreamAreaGraph
                lineColour="#39700b"
                fillColour="#75a549"
                parentBorderColour="#888777"
                title="Elevation Graph"
                streamType="altitude"
                highDomain={activity.elev_low}
                lowDomain={activity.elev_low}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={9} className="no-left-padding">
              <StreamLineGraph
                lineColour="#FF0000"
                parentBorderColour="#888777"
                title="Heart Rate"
                streamType="heartrate"
                highDomain={activity.max_heartrate}
                lowDomain={0}
              />
            </Grid>
            {activity.average_cadence && activity.average_cadence > 0 && (
              <Grid item xs={12} md={8} lg={9} className="no-left-padding">
                <StreamLineGraph
                  lineColour="#515151"
                  parentBorderColour="#888777"
                  title="Cadence"
                  streamType="cadence"
                  highDomain={140}
                  lowDomain={0}
                />
              </Grid>
            )}
            {activity.type !== 'VirtualRide' && (
              <Grid item xs={12} md={8} lg={9} className="no-left-padding">
                <StreamLineGraph
                  lineColour="#998100"
                  parentBorderColour="#888777"
                  title="Temperature"
                  streamType="temp"
                  highDomain={40}
                  lowDomain={0}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default StravaActivityDetail;
