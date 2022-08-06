/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivityStreamAction } from 'src/actions';
import { ActivityDetail, StreamTypes, VictoryLineData } from 'src/models';

import {
  getActivityStreamIsLoading,
  getActivityStreamResponse,
} from 'src/selectors';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { formatLineDataFromStreamOverDistance } from '../../utils/lineGraph.util';
import LoadingSkeleton from '../Common/Skeleton';

type StreamGraphProps = {
  activityDetail: ActivityDetail;
  lineColour: string;
  parentBorderColour: string;
  title: string;
  streamType: StreamTypes;
  highDomain?: number;
  lowDomain?: number;
};

const StreamGraph = (props: StreamGraphProps): JSX.Element => {
  const dispatch = useDispatch();

  const {
    activityDetail,
    lineColour,
    highDomain,
    lowDomain,
    title,
    parentBorderColour,
    streamType,
  } = props;
  const { id } = activityDetail;

  const [data, setData] = useState<Array<VictoryLineData> | undefined>(
    undefined,
  );

  const streamResponse = useSelector(getActivityStreamResponse);
  const isLoading = useSelector(getActivityStreamIsLoading);

  useEffect(() => {
    dispatch(
      fetchActivityStreamAction({
        id,
        types: [streamType],
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
      setData(formatLineDataFromStreamOverDistance(stream, streamType));
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
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Grid container direction="row">
            <VictoryChart
              theme={VictoryTheme.material}
              width={1000}
              height={250}
            >
              <VictoryLine
                style={{
                  data: { stroke: lineColour },
                  parent: {
                    border: `1px solid ${parentBorderColour}`,
                  },
                }}
                data={data}
                minDomain={lowDomain}
                maxDomain={highDomain}
              />
            </VictoryChart>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default StreamGraph;
