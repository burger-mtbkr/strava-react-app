/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import {
  IAthleteStats,
  IStravaActivity,
  IStravaSession,
  IStravaAthlete,
} from 'src/models';
import { getObject, getUnix, setItem } from 'src/utils';

const apiBaseEndpoint = 'https://www.strava.com';

export const isAuthorized = (): boolean => {
  const stravaSession = getObject<IStravaSession>('strava_session');
  if (!stravaSession) return false;
  const now: number = getUnix();
  return now < stravaSession.expires_at;
};

export const authenticateStrava = async (code?: string): Promise<boolean> => {
  try {
    if (!code) {
      if (isAuthorized()) {
        return true;
      }
    }
    console.log('auth_code', code);
    const grantType = code ? 'authorization_code' : 'refresh_token';
    let stravaEndPoint = `${apiBaseEndpoint}/oauth/token?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&client_secret=${process.env.REACT_APP_STRAVA_CLIENT_SECRET}&grant_type=${grantType}`;
    const session = getObject<IStravaSession>('strava_session');

    if (grantType === 'authorization_code' && code) {
      stravaEndPoint = `${stravaEndPoint}&code=${code}`;
    } else if (grantType === 'refresh_token' && session?.refresh_token) {
      stravaEndPoint = `${stravaEndPoint}&refresh_token=${session.refresh_token}`;
    } else {
      return false;
    }

    const response: AxiosResponse<unknown> = await axios.post(
      stravaEndPoint,
      null,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('strava_auth_response', response);
    if (response.status === 200) {
      const data = response.data as IStravaSession;

      console.log('strava_session_data', data);
      setItem('strava_session', JSON.stringify(data), true);
      if (data.athlete) {
        setItem('strava_athlete', JSON.stringify(data.athlete), true);
      }

      return true;
    }
    return false;
  } catch (error) {
    console.log('authorizeStrava', error);
    return false;
  }
};

export const getActivities = async (
  fromUnix: number,
  toUnix: number,
  page: number,
  itemCount: number,
): Promise<Array<IStravaActivity> | undefined> => {
  try {
    const stravaSession = getObject<IStravaSession>('strava_session');
    const activitiesEndPoint = `${apiBaseEndpoint}/api/v3/athlete/activities?after=${fromUnix}&before=${toUnix}&page=${page}&per_page=${itemCount}`;
    const response: AxiosResponse<unknown> = await axios.get(
      activitiesEndPoint,
      {
        headers: {
          Authorization: `Bearer ${stravaSession?.access_token}`,
        },
      },
    );

    if (response.status === 200 || response.status === 204) {
      if (response.data) {
        const data = response.data as Array<IStravaActivity>;
        return data;
      }
      return undefined;
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.log('getActivities', error);
    return undefined;
  }
};

export const getAthleteStats = async (): Promise<IAthleteStats | undefined> => {
  try {
    const stravaSession = getObject<IStravaSession>('strava_session');
    const athelete = getObject<IStravaAthlete>('strava_athlete');

    if (!athelete) return undefined;
    const activitiesEndPoint = `${apiBaseEndpoint}/api/v3/athletes/${athelete?.id}/stats`;
    const response: AxiosResponse<unknown> = await axios.get(
      activitiesEndPoint,
      {
        headers: {
          Authorization: `Bearer ${stravaSession?.access_token}`,
        },
      },
    );
    if (response.status === 200 || response.status === 204) {
      if (response.data) {
        const data = response.data as IAthleteStats;
        return data;
      }
      return undefined;
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.log('getAthleteStats', error);
    return undefined;
  }
};

export const getAthlete = async (): Promise<IStravaAthlete | undefined> => {
  try {
    const stravaSession = getObject<IStravaSession>('strava_session');
    const activitiesEndPoint = `${apiBaseEndpoint}/api/v3/athlete`;
    const response: AxiosResponse<unknown> = await axios.get(
      activitiesEndPoint,
      {
        headers: {
          Authorization: `Bearer ${stravaSession?.access_token}`,
        },
      },
    );
    if (response.status === 200 || response.status === 204) {
      if (response.data) {
        const data = response.data as IStravaAthlete;
        setItem('strava_athlete', JSON.stringify(data), true);

        return data;
      }
      return undefined;
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.log('getAthleteStats', error);
    return undefined;
  }
};
