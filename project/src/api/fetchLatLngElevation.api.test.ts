import MockAdapter from 'axios-mock-adapter';
import { LatLng } from 'leaflet';
import { fetchLatLngElevation } from './fetchLatLngElevation.api';
import { openElevationApi } from './openElevation.api';

describe(`[api] ${fetchLatLngElevation.name}`, () => {
  const mock: MockAdapter = new MockAdapter(openElevationApi);

  const mockRequest = {
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

  const mockApiResponse = {
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

  const mockResponse: Array<LatLng> = [
    new LatLng(10.0, 10.0, 515),
    new LatLng(20, 20, 545),
  ];

  const mockErrorResponse = new Error('Request failed with status code 500');

  it('should return a successful response when the api call succeeds', async () => {
    mock.onPost('lookup').reply(200, mockApiResponse);
    await fetchLatLngElevation(mockRequest).then((res) => {
      expect(res).toStrictEqual(mockResponse);
    });
  });

  it('should return a failed response when the api call fails', async () => {
    mock.onPost('lookup').reply(500);
    await fetchLatLngElevation(mockRequest).then((expectedError) => {
      expect(expectedError).toMatchObject(mockErrorResponse);
    });
  });
});
