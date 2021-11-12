import { createReducer } from '@reduxjs/toolkit';
import {
  authenticateStravaAction,
  fetchStravaActivitiesAction,
  fetchStravaAthleteAction,
  fetchStravaAthleteStatsAction,
  isLoadingAction,
} from 'src/actions';
import { IStravaState } from 'src/models/strava.model';

export const stravaInitialState: IStravaState = {
  isLoading: false,
  activitiesResponse: undefined,
  stravaAuthResponse: undefined,
  athleteResponse: undefined,
  athleteStatsResponse: undefined,
};

export default createReducer(stravaInitialState, (builder) =>
  builder
    .addCase(isLoadingAction, (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }))
    .addCase(authenticateStravaAction, (state, { payload }) => ({
      ...state,
      auth: payload,
    }))
    .addCase(fetchStravaActivitiesAction, (state, { payload }) => ({
      ...state,
      activitiesResponse: payload,
    }))

    .addCase(fetchStravaAthleteAction, (state, { payload }) => ({
      ...state,
      athleteResponse: payload,
    }))
    .addCase(fetchStravaAthleteStatsAction, (state, { payload }) => ({
      actionTriggerRefetching: undefined,
      ...state,
      athleteStatsResponse: payload,
    })),
);
