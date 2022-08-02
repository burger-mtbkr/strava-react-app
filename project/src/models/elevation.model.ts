import { AxiosError } from 'axios';
import { LatLng } from 'leaflet';

export type LongitudeLatitude = {
  longitude: number;
  latitude: number;
};

export type LongitudeLatitudeElevation = LongitudeLatitude & {
  elevation: number;
};

export type ElevationRequest = {
  locations: Array<LongitudeLatitude>;
};

export type ElevationResponse = {
  results?: Array<LatLng>;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
};

export type ElevationResults = {
  results: Array<LongitudeLatitudeElevation>;
};
