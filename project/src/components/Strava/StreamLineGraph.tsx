/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StreamTypes, VictoryLineData } from 'src/models';

import {
  getActivityStreamIsLoading,
  getActivityStreamResponse,
} from 'src/selectors';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { formatLineDataFromStreamOverDistance } from '../../utils/lineGraph.util';
import LoadingSkeleton from '../Common/Skeleton';

type StreamGraphProps = {
  lineColour: string;
  parentBorderColour: string;
  title: string;
  streamType: StreamTypes;
  highDomain?: number;
  lowDomain?: number;
};

const StreamLineGraph = (props: StreamGraphProps): JSX.Element => {
  const {
    lineColour,
    highDomain,
    lowDomain,
    title,
    parentBorderColour,
    streamType,
  } = props;

  const [data, setData] = useState<Array<VictoryLineData> | undefined>(
    undefined,
  );

  const isLoading = useSelector(getActivityStreamIsLoading);
  const streamResponse = useSelector(getActivityStreamResponse);

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
        minHeight: 200,
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
              height={300}
            >
              <VictoryLine
                style={{
                  data: {
                    stroke: lineColour,
                  },
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

export default StreamLineGraph;
