import { StreamSet, StreamTypes, VictoryLineData } from 'src/models';
import { roundNumber } from './number.util';

export const formatLineDataFromStreamOverDistance = (
  streamSet: StreamSet,
  streamType: StreamTypes,
): Array<VictoryLineData> => {
  const graphData: Array<VictoryLineData> = [];

  if (streamSet[streamType] && streamSet[streamType]?.data)
    streamSet[streamType]?.data.forEach((a: number, i: number) => {
      graphData.push({
        x: roundNumber(streamSet.distance.data[i] / 1000, 2),
        y: a,
      });
    });
  return graphData;
};
