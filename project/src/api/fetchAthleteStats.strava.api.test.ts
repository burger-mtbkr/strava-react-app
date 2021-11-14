import MockAdapter from 'axios-mock-adapter';

import { IFetchStravaAthleteStatsResponse } from 'src/models';
import { getAthleteStats } from 'src/api';
import { axiosApi, getObject } from 'src/utils';
import { mockStravaSession } from 'src/test/utils';

jest.mock('src/utils/storage.util', () => ({
  getObject: jest.fn(),
}));

describe(`[api] ${getAthleteStats.name}`, () => {
  const mock: MockAdapter = new MockAdapter(axiosApi);
  const mockAthleteId = {
    id: 12345,
    username: 'bike-rider',
    firstname: 'Bike',
    lastname: 'Rider',
  };

  const mockAthleteStats = {
    biggest_ride_distance: 300,
    biggest_climb_elevation_gain: 1285,
  };

  const activitiesEndPoint = `https://www.strava.com/api/v3/athletes/${mockAthleteId.id}/stats`;

  beforeEach(() => {
    const mockGetObject = getObject as jest.MockedFunction<typeof getObject>;
    mockGetObject.mockImplementation((key) => {
      if (key === 'strava_session') return mockStravaSession;
      if (key === 'strava_athlete') return mockAthleteId;
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
