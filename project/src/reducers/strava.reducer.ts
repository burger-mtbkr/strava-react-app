import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActivityStreamRequest,
  ActivityStreamResponse,
  ElevationRequest,
  ElevationResponse,
  IAuthenticateStravaResponse,
  IFetchStravaActivitiesRequest,
  IFetchStravaActivitiesResponse,
  IFetchStravaActivityResponse,
  IFetchStravaAthleteResponse,
  IFetchStravaAthleteStatsResponse,
} from 'src/models';
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

const stravaSlice = createSlice({
  name: 'strava',
  initialState: stravaInitialState,
  reducers: {
    isAuthLoadingAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthLoading = payload;
    },
    isActivitiesLoadingAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isActivitiesLoading = payload;
    },
    isActivityLoadingAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isActivityLoading = payload;
    },
    isAthleteLoadingAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isAthleteLoading = payload;
    },
    isStatsLoadingActions: (state, { payload }: PayloadAction<boolean>) => {
      state.isStatsLoading = payload;
    },
    isElevationDataLoadingAction: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isElevationDataLoading = payload;
    },
    isActivityStreamLoadingAction: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isActivityStreamLoading = payload;
    },
    authenticateWithStravaAction: (state) => {
      state.isAuthLoading = true;
    },
    clearStravaAuthErrorAction: (state) => {
      state.authResponse = undefined;
    },
    authenticateWithStravaDoneAction: (
      state,
      { payload }: PayloadAction<IAuthenticateStravaResponse>,
    ) => {
      state.authResponse = payload;
    },
    fetchStravaActivitiesAction: (
      _state,
      _action: PayloadAction<IFetchStravaActivitiesRequest>,
    ) => {},
    fetchStravaActivitiesDoneAction: (
      state,
      { payload }: PayloadAction<IFetchStravaActivitiesResponse>,
    ) => {
      state.activitiesResponse = payload;
    },
    fetchStravaAthleteAction: (state) => {
      state.isAthleteLoading = true;
    },
    fetchStravaAthleteDoneAction: (
      state,
      { payload }: PayloadAction<IFetchStravaAthleteResponse>,
    ) => {
      state.athleteResponse = payload;
    },
    fetchStravaAthleteStatsAction: (state) => {
      state.isStatsLoading = true;
    },
    fetchStravaAthleteStatsDoneAction: (
      state,
      { payload }: PayloadAction<IFetchStravaAthleteStatsResponse>,
    ) => {
      state.athleteStatsResponse = payload;
    },
    fetchStravaActivityAction: (_state, _action: PayloadAction<number>) => {},
    fetchStravaActivityDoneAction: (
      state,
      { payload }: PayloadAction<IFetchStravaActivityResponse>,
    ) => {
      state.activityResponse = payload;
    },
    clearStravaActivityAction: (state) => {
      state.activityResponse = undefined;
    },
    fetchActivityStreamAction: (
      _state,
      _action: PayloadAction<ActivityStreamRequest>,
    ) => {},
    fetchActivityStreamDoneAction: (
      state,
      { payload }: PayloadAction<ActivityStreamResponse>,
    ) => {
      state.activityStreamResponse = payload;
    },
    clearActivityStreamAction: (state) => {
      state.activityStreamResponse = undefined;
    },
    fetchElevationDataAction: (
      _state,
      _action: PayloadAction<ElevationRequest>,
    ) => {},
    fetchElevationDataDoneAction: (
      state,
      { payload }: PayloadAction<ElevationResponse>,
    ) => {
      state.elevationResponse = payload;
    },
  },
});

export const {
  isAuthLoadingAction,
  isActivitiesLoadingAction,
  isActivityLoadingAction,
  isAthleteLoadingAction,
  isStatsLoadingActions,
  isElevationDataLoadingAction,
  isActivityStreamLoadingAction,
  authenticateWithStravaAction,
  authenticateWithStravaDoneAction,
  clearStravaAuthErrorAction,
  fetchStravaActivitiesAction,
  fetchStravaActivitiesDoneAction,
  fetchStravaAthleteAction,
  fetchStravaAthleteDoneAction,
  fetchStravaAthleteStatsAction,
  fetchStravaAthleteStatsDoneAction,
  fetchStravaActivityAction,
  fetchStravaActivityDoneAction,
  clearStravaActivityAction,
  fetchActivityStreamAction,
  fetchActivityStreamDoneAction,
  clearActivityStreamAction,
  fetchElevationDataAction,
  fetchElevationDataDoneAction,
} = stravaSlice.actions;

export default stravaSlice.reducer;
