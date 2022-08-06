import axios, { AxiosResponse } from 'axios';
import {
  IStravaSession,
  ActivityStreamResponse,
  StreamSet,
  ActivityStreamRequest,
} from 'src/models';
import { getObject, isSuccessfulResponse } from 'src/utils';
import { stravaApi } from './strava.api';

const apiBaseEndpoint = 'https://www.strava.com';

export const fetchStravaActivityStream = async ({
  id,
  types,
}: ActivityStreamRequest): Promise<ActivityStreamResponse> => {
  try {
    const stravaSession = getObject<IStravaSession>('strava_session');
    const activityStreamEndPoint = `${apiBaseEndpoint}/api/v3/activities/${id}/streams?keys=${types.join()}&key_by_type=${true}`;
    const response: AxiosResponse<unknown> = await stravaApi.get(
      activityStreamEndPoint,
      {
        headers: {
          Authorization: `Bearer ${stravaSession?.access_token}`,
        },
      },
    );

    if (isSuccessfulResponse(response)) {
      if (response.data) {
        const data = response.data as StreamSet;
        return {
          stream: data,
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
