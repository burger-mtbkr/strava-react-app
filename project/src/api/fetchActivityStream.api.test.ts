import MockAdapter from 'axios-mock-adapter';
import { ActivityStreamResponse } from 'src/models';
import { fetchStravaActivityStream } from 'src/api';
import { getObject } from 'src/utils';
import { mockDistanceStream, mockStravaSession } from 'src/test/mocks';
import { stravaApi } from './strava.api';

jest.mock('src/utils/storage.util', () => ({
  getObject: jest.fn(),
  setObject: jest.fn(),
}));

describe(`[api] ${fetchStravaActivityStream.name}`, () => {
  const mock: MockAdapter = new MockAdapter(stravaApi);
  const id = 123456;

  const activityStreamEndPoint = `https://www.strava.com/api/v3/activities/${id}/streams?keys=distance&key_by_type=${true}`;

  beforeEach(() => {
    const mockGetObject = getObject as jest.MockedFunction<typeof getObject>;
    mockGetObject.mockImplementation((key) => {
      if (key === 'strava_session') return mockStravaSession;
      return undefined;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a successful response when the api call succeeds', async () => {
    mock.onGet(activityStreamEndPoint).reply(200, mockDistanceStream);
    await fetchStravaActivityStream({ id, types: ['distance'] }).then(
      (res: ActivityStreamResponse) => {
        expect(res.isSuccessful).toBe(true);
        expect(res.error).toBeUndefined();
        expect(res.stream).toBeDefined();
        expect(res.stream).toEqual(mockDistanceStream);
      },
    );
  });

  it('should return a failed response when the api call fails', async () => {
    mock.onGet(activityStreamEndPoint).reply(503);
    await fetchStravaActivityStream({ id, types: ['distance'] }).then(
      (res: ActivityStreamResponse) => {
        expect(res.isSuccessful).toBe(false);
        expect(res.error).toBeDefined();
        expect(res.stream).toBeUndefined();
      },
    );
  });
});
