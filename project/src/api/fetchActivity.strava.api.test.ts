import MockAdapter from 'axios-mock-adapter';
import { IFetchStravaActivityResponse } from 'src/models';
import { fetchStravaActivity } from 'src/api';
import { getObject } from 'src/utils';
import { mockStravaSession } from 'src/test/mocks';
import { stravaApi } from './strava.api';

jest.mock('src/utils/storage.util', () => ({
  getObject: jest.fn(),
  setObject: jest.fn(),
}));

describe(`[api] ${fetchStravaActivity.name}`, () => {
  const mock: MockAdapter = new MockAdapter(stravaApi);
  const id = 123456;
  const mockActivity = {
    id: 123456,
    name: 'My long bike ride',
    distance: 300,
  };

  const activityEndPoint = `https://www.strava.com/api/v3/activities/${id}`;

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
    mock.onGet(activityEndPoint).reply(200, mockActivity);
    await fetchStravaActivity(id).then((res: IFetchStravaActivityResponse) => {
      expect(res.isSuccessful).toBe(true);
      expect(res.error).toBeUndefined();
      expect(res.activity).toBeDefined();
    });
  });

  it('should return a failed response when the api call fails', async () => {
    mock.onGet(activityEndPoint).reply(503);
    await fetchStravaActivity(id).then((res: IFetchStravaActivityResponse) => {
      expect(res.isSuccessful).toBe(false);
      expect(res.error).toBeDefined();
      expect(res.activity).toBeUndefined();
    });
  });
});
