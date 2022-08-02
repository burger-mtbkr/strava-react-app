import { AxiosError } from 'axios';

/* eslint-disable camelcase */
export type StreamSet = {
  type: string;
  data: Array<number>;
  series_type: string;
  original_size: number;
  resolution: string;
};

export type ActivityStreamResponse = {
  stream?: Array<StreamSet>;
  isSuccessful: boolean;
  error?: Error | AxiosError;
};

export type ActivityStreamRequest = {
  id: number;
  types: Array<string>;
};
