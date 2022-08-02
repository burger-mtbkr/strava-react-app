import { LatLng } from 'leaflet';

export const mockElevationRequest = {
  locations: [
    {
      longitude: 10.0,
      latitude: 10.0,
    },
    {
      longitude: 20.0,
      latitude: 20.0,
    },
  ],
};

export const mockOpenElevationApiResults = {
  results: [
    {
      longitude: 10.0,
      latitude: 10.0,
      elevation: 515,
    },
    {
      longitude: 20.0,
      latitude: 20.0,
      elevation: 545,
    },
  ],
};

export const mockElevationResults = [
  new LatLng(10.0, 10.0, 515),
  new LatLng(20, 20, 545),
];

export const mockResponse = {
  results: mockElevationResults,
  isSuccessful: true,
};
