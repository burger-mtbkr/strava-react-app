import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';
import { IFetchStravaActivitiesResponse } from 'src/models';
import { fetchStravaActivities } from 'src/api';
import { axiosApi, getObject } from 'src/utils';
import { mockStravaSession } from 'src/test/utils';

jest.mock('src/utils/storage.util', () => ({
  getObject: jest.fn(),
  setItem: jest.fn(),
}));

describe(`[api] ${fetchStravaActivities.name}`, () => {
  const mock: MockAdapter = new MockAdapter(axiosApi);

  const mockActivity = {
    name: 'My long bike ride',
    distance: 300,
  };

  const request = {
    fromUnix: moment().utc().subtract(30, 'days').unix(),
    toUnix: moment.utc().unix(),
    page: 1,
    itemCount: 50,
  };

  const activitiesEndPoint = `https://www.strava.com/api/v3/athlete/activities?after=${request.fromUnix}&before=${request.toUnix}&page=${request.page}&per_page=${request.itemCount}`;

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
    mock.onGet(activitiesEndPoint).reply(200, mockActivity);
    await fetchStravaActivities(request).then(
      (res: IFetchStravaActivitiesResponse) => {
        expect(res.isSuccessful).toBe(true);
        expect(res.error).toBeUndefined();
        expect(res.activities).toBeDefined();
      },
    );
  });

  it('should return a failed response when the api call fails', async () => {
    mock.onGet(activitiesEndPoint).reply(503);
    await fetchStravaActivities(request).then(
      (res: IFetchStravaActivitiesResponse) => {
        expect(res.isSuccessful).toBe(false);
        expect(res.error).toBeDefined();
        expect(res.activities).toBeUndefined();
      },
    );
  });
});
