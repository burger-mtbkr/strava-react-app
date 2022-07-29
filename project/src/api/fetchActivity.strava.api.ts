/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import {
  IStravaSession,
  IFetchStravaActivityResponse,
  ActivityDetail,
} from 'src/models';
import { getObject, isSuccessfulResponse } from 'src/utils';
import { stravaApi } from './strava.api';

const apiBaseEndpoint = 'https://www.strava.com';

export const fetchStravaActivity = async (
  id: number,
): Promise<IFetchStravaActivityResponse> => {
  try {
    const stravaSession = getObject<IStravaSession>('strava_session');
    const activitiesEndPoint = `${apiBaseEndpoint}/api/v3/activities/${id}`;
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
        const data = response.data as ActivityDetail;
        return {
          activity: data,
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
