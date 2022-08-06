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
  fetchStravaActivityDoneAction,
  isActivityLoadingAction,
  isElevationDataLoadingAction,
  fetchElevationDataDoneAction,
  isActivityStreamLoadingAction,
  fetchActivityStreamDoneAction,
  clearStravaActivityAction,
  clearActivityStreamAction,
} from 'src/actions';
import { IStravaState } from 'src/models/strava.model';

export const stravaInitialState: IStravaState = {
  isAuthLoading: false,
  isActivitiesLoading: false,
  isActivityLoading: false,
  isAthleteLoading: false,
  isStatsLoading: false,
  isElevationDataLoading: false,
  isActivityStreamLoading: false,
  authResponse: undefined,
  activitiesResponse: undefined,
  activityResponse: undefined,
  athleteResponse: undefined,
  athleteStatsResponse: undefined,
  elevationResponse: undefined,
  activityStreamResponse: undefined,
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
    .addCase(isActivityLoadingAction, (state, { payload }) => ({
      ...state,
      isActivityLoading: payload,
    }))
    .addCase(isAthleteLoadingAction, (state, { payload }) => ({
      ...state,
      isAthleteLoading: payload,
    }))
    .addCase(isStatsLoadingActions, (state, { payload }) => ({
      ...state,
      isStatsLoading: payload,
    }))
    .addCase(isElevationDataLoadingAction, (state, { payload }) => ({
      ...state,
      isElevationDataLoading: payload,
    }))
    .addCase(isActivityStreamLoadingAction, (state, { payload }) => ({
      ...state,
      isActivityStreamLoading: payload,
    }))
    .addCase(authenticateWithStravaDoneAction, (state, { payload }) => ({
      ...state,
      authResponse: payload,
    }))
    .addCase(fetchStravaActivitiesDoneAction, (state, { payload }) => ({
      ...state,
      activitiesResponse: payload,
    }))
    .addCase(fetchStravaActivityDoneAction, (state, { payload }) => ({
      ...state,
      activityResponse: payload,
    }))
    .addCase(clearStravaActivityAction, (state) => ({
      ...state,
      activityResponse: undefined,
    }))
    .addCase(fetchStravaAthleteDoneAction, (state, { payload }) => ({
      ...state,
      athleteResponse: payload,
    }))
    .addCase(fetchStravaAthleteStatsDoneAction, (state, { payload }) => ({
      ...state,
      athleteStatsResponse: payload,
    }))
    .addCase(fetchElevationDataDoneAction, (state, { payload }) => ({
      ...state,
      elevationResponse: payload,
    }))
    .addCase(fetchActivityStreamDoneAction, (state, { payload }) => ({
      ...state,
      activityStreamResponse: payload,
    }))
    .addCase(clearActivityStreamAction, (state) => ({
      ...state,
      activityStreamResponse: undefined,
    })),
);
