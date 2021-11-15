import MockAdapter from 'axios-mock-adapter';

import { IFetchStravaAthleteResponse } from 'src/models';
import { fetchStravaAthlete } from 'src/api';
import { axiosApi } from 'src/utils';
import * as storageUtils from 'src/utils/storage.util';
import { mockAthlete, mockStravaSession } from 'src/test/utils';

describe(`[api] ${fetchStravaAthlete.name}`, () => {
  const mock: MockAdapter = new MockAdapter(axiosApi);

  const activitiesEndPoint = `https://www.strava.com/api/v3/athlete`;

  beforeEach(() => {
    jest.spyOn(storageUtils, 'getObject').mockReturnValue(mockStravaSession);
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
