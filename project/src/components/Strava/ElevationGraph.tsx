/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivityStreamAction } from 'src/actions';
import { ActivityDetail, VictoryLineData } from 'src/models';

import {
  getActivityStreamIsLoading,
  getActivityStreamResponse,
} from 'src/selectors';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { formatLineDataFromStream } from '../../utils/lineGraph.util';
import LoadingSkeleton from '../Common/Skeleton';

const ElevationGraph = (activity: ActivityDetail): JSX.Element => {
  const dispatch = useDispatch();
  const { id, elev_low, elev_high } = activity;
  const [data, setData] = useState<Array<VictoryLineData> | undefined>(
    undefined,
  );

  const streamResponse = useSelector(getActivityStreamResponse);
  const isLoading = useSelector(getActivityStreamIsLoading);

  useEffect(() => {
    dispatch(
      fetchActivityStreamAction({
        id,
        types: ['altitude'],
      }),
    );
  }, [dispatch, id]);

  useEffect(() => {
    if (
      streamResponse?.isSuccessful &&
      streamResponse.stream &&
      streamResponse.stream
    ) {
      const { stream } = streamResponse;
      setData(formatLineDataFromStream(stream));
    } else {
      setData(undefined);
    }
  }, [streamResponse]);

  return (
    <Container
      className="no-left-padding"
      sx={{
        minHeight: 300,
        minWidth: 400,
        marginRight: '20px',
      }}
    >
      {isLoading && <LoadingSkeleton />}
      {!isLoading && data && (
        <Grid container item>
          <Grid item textAlign="start">
            <Typography variant="h6">Elevation Graph</Typography>
          </Grid>
          <Grid container direction="row">
            <VictoryChart
              theme={VictoryTheme.material}
              width={1000}
              height={250}
            >
              <VictoryLine
                style={{
                  data: { stroke: '#c43a31' },
                  parent: {
                    border: '1px solid #c3c4c3',
                  },
                }}
                data={data}
                minDomain={elev_low}
                maxDomain={elev_high}
              />
            </VictoryChart>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ElevationGraph;
