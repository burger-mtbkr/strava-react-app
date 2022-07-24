import axios, { AxiosResponse } from 'axios';
import { IAuthenticateStravaResponse, IStravaSession } from 'src/models';
import {
  stravaApi,
  getObject,
  getUnix,
  isSuccessfulResponse,
  setItem,
} from 'src/utils';

const apiBaseEndpoint = 'https://www.strava.com';

export const isAuthorized = (stravaSession?: IStravaSession): boolean => {
  if (!stravaSession) return false;
  const now: number = getUnix();
  return now < stravaSession.expires_at;
};

export const authenticateWithStrava = async (
  code?: string,
): Promise<IAuthenticateStravaResponse> => {
  try {
    const session = getObject<IStravaSession>('strava_session');
    if (!code) {
      if (isAuthorized(session)) {
        return {
          isSuccessful: true,
          stravaSession: session,
        };
      }
    }

    const clientId = process.env.REACT_APP_STRAVA_CLIENT_ID ?? '';
    const clientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET ?? '';
    const grantType = code ? 'authorization_code' : 'refresh_token';

    let stravaEndPoint = `${apiBaseEndpoint}/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`;

    if (grantType === 'authorization_code' && code) {
      stravaEndPoint = `${stravaEndPoint}&code=${code}`;
    } else if (grantType === 'refresh_token' && session?.refresh_token) {
      stravaEndPoint = `${stravaEndPoint}&refresh_token=${session.refresh_token}`;
    } else {
      return {
        error: new Error('Authentication failed'),
        isSuccessful: false,
      };
    }

    const response: AxiosResponse<unknown> = await stravaApi.post(
      stravaEndPoint,
      null,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    if (isSuccessfulResponse(response)) {
      const data = response.data as IStravaSession;

      setItem('strava_session', JSON.stringify(data), true);
      if (data.athlete) {
        setItem('strava_athlete', JSON.stringify(data.athlete), true);
      }

      return {
        isSuccessful: true,
        stravaSession: data,
      };
    }

    return {
      isSuccessful: false,
      error: new Error('Authentication failed'),
    };
  } catch (error) {
    return {
      isSuccessful: false,
      error: axios.isAxiosError(error)
        ? error
        : new Error('Authentication failed'),
    };
  }
};
