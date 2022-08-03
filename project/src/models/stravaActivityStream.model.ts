import { AxiosError } from 'axios';

export type StreamData = {
  data: Array<number>;
  series_type: string;
  original_size: number;
  resolution: string;
};

export interface DistanceStreamSet {
  distance: StreamData;
}

export interface AltitudeStreamSet {
  altitude: StreamData;
}

export type StreamSet = DistanceStreamSet & AltitudeStreamSet;

export type ActivityStreamResponse = {
  stream?: StreamSet;
  isSuccessful: boolean;
  error?: Error | AxiosError;
};

export type ActivityStreamRequest = {
  id: number;
  types: Array<string>;
};
