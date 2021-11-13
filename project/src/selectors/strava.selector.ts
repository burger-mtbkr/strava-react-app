import {
  IFetchStravaActivitiesResponse,
  IAuthenticateStravaResponse,
  IFetchStravaAthleteResponse,
  IFetchStravaAthleteStatsResponse,
} from 'src/models';
import { TStoreState } from 'src/reducers';

export const getStravaAuthenticateResponse = (
  state: TStoreState,
): IAuthenticateStravaResponse | undefined => state.strava.authResponse;

export const getStravaAuthIsLoading = (state: TStoreState): boolean =>
  state.strava.isAuthLoading;

export const getStravaActivitiesIsLoading = (state: TStoreState): boolean =>
  state.strava.isActivitiesLoading;

export const getStravaAthleteIsLoading = (state: TStoreState): boolean =>
  state.strava.isAthleteLoading;

export const getStravaAthleteStatsIsLoading = (state: TStoreState): boolean =>
  state.strava.isStatsLoading;

export const getStravaActivityResponse = (
  state: TStoreState,
): IFetchStravaActivitiesResponse | undefined =>
  state.strava.activitiesResponse;

export const getStravaAthleteResponse = (
  state: TStoreState,
): IFetchStravaAthleteResponse | undefined => state.strava.athleteResponse;

export const getStravaAthleteStatsResponse = (
  state: TStoreState,
): IFetchStravaAthleteStatsResponse | undefined =>
  state.strava.athleteStatsResponse;
