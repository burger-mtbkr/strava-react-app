/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import {
  IFetchStravaActivitiesRequest,
  IStravaActivity,
  IStravaSession,
} from 'src/models';
import { getObject } from 'src/utils';

const apiBaseEndpoint = 'https://www.strava.com';

export const fetchStravaActivities = async ({
  fromUnix,
  toUnix,
  page,
  itemCount,
}: IFetchStravaActivitiesRequest): Promise<
  Array<IStravaActivity> | undefined
> => {
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
