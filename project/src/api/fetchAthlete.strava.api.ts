import axios, { AxiosResponse } from 'axios';
import {
  IStravaSession,
  StravaAthlete,
  IFetchStravaAthleteResponse,
} from 'src/models';
import { getObject, isSuccessfulResponse, setObject } from 'src/utils';
import { stravaApi } from './strava.api';

const apiBaseEndpoint = 'https://www.strava.com';

export const fetchStravaAthlete =
  async (): Promise<IFetchStravaAthleteResponse> => {
    try {
      const athlete = getObject<StravaAthlete>('strava_athlete');
      if (athlete) {
        return {
          athlete,
          isSuccessful: true,
        };
      }
      const stravaSession = getObject<IStravaSession>('strava_session');
      const activitiesEndPoint = `${apiBaseEndpoint}/api/v3/athlete`;
      const response: AxiosResponse<unknown> = await stravaApi.get(
        activitiesEndPoint,
        {
          headers: {
            Authorization: `Bearer ${stravaSession?.access_token}`,
          },
        },
      );

      if (isSuccessfulResponse(response)) {
        if (response.data) {
          const data = response.data as StravaAthlete;
          setObject('strava_athlete', JSON.stringify(data), true);

          return {
            athlete: data,
            isSuccessful: true,
          };
        }
        return {
          error: new Error('An error has occured'),
          isSuccessful: false,
        };
      }
      throw new Error(response.statusText);
    } catch (error) {
      return {
        isSuccessful: false,
        error: axios.isAxiosError(error)
          ? error
          : new Error('An error has occured'),
      };
    }
  };
