import { createAction } from '@reduxjs/toolkit';
import {
  IAuthenticateStravaResponse,
  IFetchStravaAthleteResponse,
  IFetchStravaAthleteStatsResponse,
  IFetchStravaActivitiesResponse,
} from 'src/models';

const STRAVA_PREFIX = 'STRAVA';

export const isLoadingAction = createAction<boolean>(
  `${STRAVA_PREFIX}/API/IS_LOADING`,
);

export const authenticateStravaAction =
  createAction<IAuthenticateStravaResponse>(
    `${STRAVA_PREFIX}/API/AUTHENTICATE`,
  );

export const fetchStravaActivitiesAction = createAction<
  IFetchStravaActivitiesResponse[]
>(`${STRAVA_PREFIX}/API/_FETCH_ACTIVITIES`);

export const fetchStravaAthleteAction =
  createAction<IFetchStravaAthleteResponse>(
    `${STRAVA_PREFIX}/API/_FETCH_ATHLETE`,
  );

export const fetchStravaAthleteStatsAction =
  createAction<IFetchStravaAthleteStatsResponse>(
    `${STRAVA_PREFIX}/API/FETCH_ATHLETE_STATS`,
  );
