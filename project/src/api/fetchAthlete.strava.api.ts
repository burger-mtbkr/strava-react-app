/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import {
  IStravaSession,
  IStravaAthlete,
  IFetchStravaAthleteResponse,
} from 'src/models';
import { getObject, isSuccessfulResponse, setItem } from 'src/utils';

const apiBaseEndpoint = 'https://www.strava.com';

export const fetchStravaAthlete =
  async (): Promise<IFetchStravaAthleteResponse> => {
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

      if (isSuccessfulResponse(response)) {
        if (response.data) {
          const data = response.data as IStravaAthlete;
          setItem('strava_athlete', JSON.stringify(data), true);

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
