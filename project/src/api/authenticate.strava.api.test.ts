import { IAuthenticateStravaResponse } from 'src/models';
import MockAdapter from 'axios-mock-adapter';
import { authenticateWithStrava } from 'src/api';
import { axiosApi, getObject } from 'src/utils';
import { mockStravaSession } from 'src/test/utils';

jest.mock('src/utils/storage.util', () => ({
  getObject: jest.fn(),
  setItem: jest.fn(),
}));

describe(`[api] ${authenticateWithStrava.name}`, () => {
  const mock: MockAdapter = new MockAdapter(axiosApi);

  describe('When the grant type is authorization_code', () => {
    const mockCode = 'abcdef';
    const stravaEndPoint = `https://www.strava.com/oauth/token?client_id=&client_secret=&grant_type=authorization_code&code=${mockCode}`;

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

    it('should return a successful response when the call suicceeds', async () => {
      mock.onPost(stravaEndPoint).reply(200, mockStravaSession);
      await authenticateWithStrava(mockCode).then(
        (res: IAuthenticateStravaResponse) => {
          expect(res.isSuccessful).toBe(true);
          expect(res.error).toBeUndefined();
          expect(res.stravaSession).toBeDefined();
        },
      );
    });

    it('returns a failed response when the call fails', async () => {
      mock.onPost(stravaEndPoint).reply(500);
      await authenticateWithStrava(mockCode).then(
        (res: IAuthenticateStravaResponse) => {
          expect(res.isSuccessful).toBe(false);
          expect(res.error).toBeDefined();
          expect(res.stravaSession).toBeUndefined();
        },
      );
    });
  });

  describe('When the grant type is refresh_token', () => {
    const stravaEndPoint = `https://www.strava.com/oauth/token?client_id=&client_secret=&grant_type=refresh_token&refresh_token=mock-refresh-token`;
    const mockGetObject = getObject as jest.MockedFunction<typeof getObject>;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a successful response when the api call succeeds', async () => {
      mockGetObject.mockImplementation((key) => {
        if (key === 'strava_session') return mockStravaSession;
        return undefined;
      });

      mock.onPost(stravaEndPoint).reply(200, mockStravaSession);
      await authenticateWithStrava().then(
        (res: IAuthenticateStravaResponse) => {
          expect(res.isSuccessful).toBe(true);
          expect(res.error).toBeUndefined();
          expect(res.stravaSession).toBeDefined();
        },
      );
    });

    it('should return a failed response when the api call fails', async () => {
      mockGetObject.mockImplementation(undefined);
      mock.onPost(stravaEndPoint).reply(503);
      await authenticateWithStrava().then(
        (res: IAuthenticateStravaResponse) => {
          expect(res.isSuccessful).toBe(false);
          expect(res.error).toBeDefined();
          expect(res.stravaSession).toBeUndefined();
        },
      );
    });
  });
});
