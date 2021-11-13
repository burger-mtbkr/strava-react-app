/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import {
  IFetchStravaActivitiesRequest,
  IFetchStravaActivitiesResponse,
  IStravaActivity,
  IStravaSession,
} from 'src/models';
import { getObject, isSuccessfulResponse } from 'src/utils';

const apiBaseEndpoint = 'https://www.strava.com';

export const fetchStravaActivities = async ({
  fromUnix,
  toUnix,
  page,
  itemCount,
}: IFetchStravaActivitiesRequest): Promise<IFetchStravaActivitiesResponse> => {
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

    if (isSuccessfulResponse(response)) {
      if (response.data) {
        const data = response.data as Array<IStravaActivity>;
        return {
          activities: data,
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
