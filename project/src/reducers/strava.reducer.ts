import { createReducer } from '@reduxjs/toolkit';
import {
  isActivitiesLoadingAction,
  isAthleteLoadingAction,
  isStatsLoadingActions,
  authenticateWithStravaDoneAction,
  fetchStravaActivitiesDoneAction,
  isAuthLoadingAction,
  fetchStravaAthleteStatsDoneAction,
  fetchStravaAthleteDoneAction,
} from 'src/actions';
import { IStravaState } from 'src/models/strava.model';

export const stravaInitialState: IStravaState = {
  isAuthLoading: false,
  isActivitiesLoading: false,
  isAthleteLoading: false,
  isStatsLoading: false,
  authResponse: undefined,
  activitiesResponse: undefined,
  athleteResponse: undefined,
  athleteStatsResponse: undefined,
};

export default createReducer(stravaInitialState, (builder) =>
  builder
    .addCase(isAuthLoadingAction, (state, { payload }) => ({
      ...state,
      isAuthLoading: payload,
    }))
    .addCase(isActivitiesLoadingAction, (state, { payload }) => ({
      ...state,
      isActivitiesLoading: payload,
    }))
    .addCase(isAthleteLoadingAction, (state, { payload }) => ({
      ...state,
      isAthleteLoading: payload,
    }))
    .addCase(isStatsLoadingActions, (state, { payload }) => ({
      ...state,
      isStatsLoading: payload,
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
