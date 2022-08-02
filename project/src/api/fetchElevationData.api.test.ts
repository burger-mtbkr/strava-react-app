import MockAdapter from 'axios-mock-adapter';
import {
  mockElevationRequest,
  mockOpenElevationApiResults,
  mockResponse,
} from 'src/test/mocks/elevation.mock';
import { fetchElevationData } from './fetchElevationData.api';
import { openElevationApi } from './openElevation.api';

describe(`[api] ${fetchElevationData.name}`, () => {
  const mock: MockAdapter = new MockAdapter(openElevationApi);

  const mockErrorResponse = {
    error: new Error('Request failed with status code 500'),
    isSuccessful: false,
  };

  it('should return a successful response when the api call succeeds', async () => {
    mock.onPost('lookup').reply(200, mockOpenElevationApiResults);
    await fetchElevationData(mockElevationRequest).then((res) => {
      expect(res).toStrictEqual(mockResponse);
    });
  });

  it('should return a failed response when the api call fails', async () => {
    mock.onPost('lookup').reply(500);
    await fetchElevationData(mockElevationRequest).then((expectedError) => {
      expect(expectedError).toMatchObject(mockErrorResponse);
    });
  });
});
