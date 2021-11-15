import MockAdapter from 'axios-mock-adapter';

import { IFetchStravaAthleteStatsResponse } from 'src/models';
import { getAthleteStats } from 'src/api';
import { axiosApi, getObject } from 'src/utils';
import {
  mockStravaSession,
  mockAthlete,
  mockAthleteStats,
} from 'src/test/utils';

jest.mock('src/utils/storage.util', () => ({
  getObject: jest.fn(),
  setItem: jest.fn(),
}));

describe(`[api] ${getAthleteStats.name}`, () => {
  const mock: MockAdapter = new MockAdapter(axiosApi);

  const activitiesEndPoint = `https://www.strava.com/api/v3/athletes/${mockAthlete.id}/stats`;

  beforeEach(() => {
    const mockGetObject = getObject as jest.MockedFunction<typeof getObject>;
    mockGetObject.mockImplementation((key) => {
      if (key === 'strava_session') return mockStravaSession;
      if (key === 'strava_athlete') return mockAthlete;
      return undefined;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a successful response when the api call succeeds', async () => {
    mock.onGet(activitiesEndPoint).reply(200, mockAthleteStats);
    await getAthleteStats().then((res: IFetchStravaAthleteStatsResponse) => {
      expect(res.isSuccessful).toBe(true);
      expect(res.error).toBeUndefined();
      expect(res.athleteStats).toBeDefined();
    });
  });

  it('should return a failed response when the api call fails', async () => {
    mock.onGet(activitiesEndPoint).reply(500);
    await getAthleteStats().then((res: IFetchStravaAthleteStatsResponse) => {
      expect(res.isSuccessful).toBe(false);
      expect(res.error).toBeDefined();
      expect(res.athleteStats).toBeUndefined();
    });
  });
});
