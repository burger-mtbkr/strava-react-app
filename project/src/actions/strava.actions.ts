import { createAction } from '@reduxjs/toolkit';
import {
  IAuthenticateStravaResponse,
  IFetchStravaAthleteResponse,
  IFetchStravaAthleteStatsResponse,
  IFetchStravaActivitiesResponse,
  IFetchStravaActivitiesRequest,
  IFetchStravaActivityResponse,
  ActivityStreamResponse,
  ActivityStreamRequest,
} from 'src/models';

const STRAVA_PREFIX = 'STRAVA';

export const isAuthLoadingAction = createAction<boolean>(
  `${STRAVA_PREFIX}/API/IS_LOADING_AUTH`,
);

export const isActivitiesLoadingAction = createAction<boolean>(
  `${STRAVA_PREFIX}/API/IS_LOADING_ACTIVITIES`,
);

export const isAthleteLoadingAction = createAction<boolean>(
  `${STRAVA_PREFIX}/API/IS_LOADING_ATHLETE`,
);

export const isStatsLoadingActions = createAction<boolean>(
  `${STRAVA_PREFIX}/API/IS_LOADING_STATS`,
);

export const authenticateWithStravaAction = createAction<string | undefined>(
  `${STRAVA_PREFIX}/API/AUTHENTICATE_WITH_STRAVA`,
);

export const authenticateWithStravaDoneAction =
  createAction<IAuthenticateStravaResponse>(
    `${STRAVA_PREFIX}/API/AUTHENTICATE_WITH_STRAVA_DONE`,
  );

export const fetchStravaActivitiesAction =
  createAction<IFetchStravaActivitiesRequest>(
    `${STRAVA_PREFIX}/API/_FETCH_ACTIVITIES`,
  );

export const fetchStravaActivitiesDoneAction =
  createAction<IFetchStravaActivitiesResponse>(
    `${STRAVA_PREFIX}/API/_FETCH_ACTIVITIES_DONE`,
  );

export const fetchStravaAthleteAction = createAction(
  `${STRAVA_PREFIX}/API/_FETCH_ATHLETE`,
);
export const fetchStravaAthleteDoneAction =
  createAction<IFetchStravaAthleteResponse>(
    `${STRAVA_PREFIX}/API/_FETCH_ATHLETE_DONE`,
  );

export const fetchStravaAthleteStatsAction = createAction(
  `${STRAVA_PREFIX}/API/FETCH_ATHLETE_STATS`,
);

export const fetchStravaAthleteStatsDoneAction =
  createAction<IFetchStravaAthleteStatsResponse>(
    `${STRAVA_PREFIX}/API/FETCH_ATHLETE_STATS_DONE`,
  );

export const isActivityLoadingAction = createAction<boolean>(
  `${STRAVA_PREFIX}/API/IS_LOADING_ACTIVITY`,
);

export const fetchStravaActivityAction = createAction<number>(
  `${STRAVA_PREFIX}/API/_FETCH_ACTIVITY`,
);

export const fetchStravaActivityDoneAction =
  createAction<IFetchStravaActivityResponse>(
    `${STRAVA_PREFIX}/API/_FETCH_ACTIVITY_DONE`,
  );

export const isActivityStreamLoadingAction = createAction<boolean>(
  `${STRAVA_PREFIX}/API/IS_LOADING_ACTIVITY_STREAM`,
);

export const fetchActivityStreamAction = createAction<ActivityStreamRequest>(
  `${STRAVA_PREFIX}/API/_FETCH_ACTIVITY_STREAM`,
);

export const fetchActivityStreamDoneAction =
  createAction<ActivityStreamResponse>(
    `${STRAVA_PREFIX}/API/_FETCH_ACTIVITY_STREAM_DONE`,
  );
