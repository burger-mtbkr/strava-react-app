import { createReducer } from '@reduxjs/toolkit';
import {
  authenticateWithStravaDoneAction,
  fetchStravaActivitiesDoneAction,
  isLoadingAction,
  fetchStravaAthleteStatsDoneAction,
  fetchStravaAthleteDoneAction,
} from 'src/actions';
import { IStravaState } from 'src/models/strava.model';

export const stravaInitialState: IStravaState = {
  isLoading: false,
  authResponse: undefined,
  activitiesResponse: undefined,
  athleteResponse: undefined,
  athleteStatsResponse: undefined,
};

export default createReducer(stravaInitialState, (builder) =>
  builder
    .addCase(isLoadingAction, (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }))
    .addCase(authenticateWithStravaDoneAction, (state, { payload }) => ({
      ...state,
      authResponse: payload,
    }))
    .addCase(fetchStravaActivitiesDoneAction, (state, { payload }) => ({
      ...state,
      activitiesResponse: payload,
    }))
    .addCase(fetchStravaAthleteDoneAction, (state, { payload }) => ({
      ...state,
      athleteResponse: payload,
    }))
    .addCase(fetchStravaAthleteStatsDoneAction, (state, { payload }) => ({
      ...state,
      athleteStatsResponse: payload,
    })),
);
