/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import {
  IAthleteStats,
  IStravaSession,
  StravaAthlete,
  IFetchStravaAthleteStatsResponse,
} from 'src/models';
import { getObject, isSuccessfulResponse } from 'src/utils';
import { stravaApi } from './strava.api';

const apiBaseEndpoint = 'https://www.strava.com';

export const getAthleteStats =
  async (): Promise<IFetchStravaAthleteStatsResponse> => {
    try {
      const stravaSession = getObject<IStravaSession>('strava_session');
      const athlete = getObject<StravaAthlete>('strava_athlete');

      if (!athlete)
        return {
          isSuccessful: false,
          error: new Error('Athlete is not set'),
        };
      const activitiesEndPoint = `${apiBaseEndpoint}/api/v3/athletes/${athlete?.id}/stats`;
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
          const data = response.data as IAthleteStats;
          return {
            athleteStats: data,
            isSuccessful: true,
          };
        }
        return {
          isSuccessful: false,
          error: new Error('An error has occured'),
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
