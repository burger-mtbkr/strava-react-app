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
