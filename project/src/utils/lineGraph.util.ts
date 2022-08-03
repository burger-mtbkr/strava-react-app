import { StreamSet, VictoryLineData } from 'src/models';
import { roundNumber } from './number.util';

export const formatLineDataFromStream = (
  streamSet: StreamSet,
): Array<VictoryLineData> => {
  const graphData: Array<VictoryLineData> = [];
  streamSet.altitude.data.forEach((a: number, i: number) => {
    graphData.push({
      x: roundNumber(streamSet.distance.data[i] / 1000, 2),
      y: a,
    });
  });
  return graphData;
};
