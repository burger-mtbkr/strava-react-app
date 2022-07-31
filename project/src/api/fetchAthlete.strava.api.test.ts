import MockAdapter from 'axios-mock-adapter';

import { IFetchStravaAthleteResponse } from 'src/models';
import { fetchStravaAthlete } from 'src/api';
import { getObject } from 'src/utils';
import { mockAthlete, mockStravaSession } from 'src/test/mocks';
import { stravaApi } from './strava.api';

jest.mock('src/utils/storage.util', () => ({
  getObject: jest.fn(),
  setObject: jest.fn(),
}));

describe(`[api] ${fetchStravaAthlete.name}`, () => {
  const mock: MockAdapter = new MockAdapter(stravaApi);

  const activitiesEndPoint = `https://www.strava.com/api/v3/athlete`;

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
    mock.onGet(activitiesEndPoint).reply(200, mockAthlete);
    await fetchStravaAthlete().then((res: IFetchStravaAthleteResponse) => {
      expect(res.isSuccessful).toBe(true);
      expect(res.error).toBeUndefined();
      expect(res.athlete).toBeDefined();
    });
  });

  it('should return a failed response when the api call fails', async () => {
    mock.onGet(activitiesEndPoint).reply(500);
    await fetchStravaAthlete().then((res: IFetchStravaAthleteResponse) => {
      expect(res.isSuccessful).toBe(false);
      expect(res.error).toBeDefined();
      expect(res.athlete).toBeUndefined();
    });
  });
});
