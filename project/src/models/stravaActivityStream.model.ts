import { AxiosError } from 'axios';

export type StreamTypes =
  | 'time'
  | 'distance'
  | 'latlng'
  | 'altitude'
  | 'heartrate'
  | 'cadence'
  | 'watts'
  | 'temp';

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

export interface TimeStreamSet {
  time: StreamData;
}

export interface LatLngStreamSet {
  latlng: StreamData;
}
export interface HeartrateStreamSet {
  heartrate: StreamData;
}

export interface CadenceStreamSet {
  cadence: StreamData;
}

export interface TemperatureStream {
  temp: StreamData;
}

export interface WattsStreamSet {
  watts: StreamData;
}

export type StreamSet = TimeStreamSet &
  DistanceStreamSet &
  LatLngStreamSet &
  AltitudeStreamSet &
  HeartrateStreamSet &
  CadenceStreamSet &
  TemperatureStream &
  WattsStreamSet;

export type ActivityStreamResponse = {
  stream?: StreamSet;
  isSuccessful: boolean;
  error?: Error | AxiosError;
};

export type ActivityStreamRequest = {
  id: number;
  types: Array<StreamTypes>;
};
