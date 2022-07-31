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
  results: Array<LongitudeLatitudeElevation>;
};
