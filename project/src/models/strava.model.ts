import {
  IAuthenticateStravaResponse,
  IFetchStravaAthleteResponse,
  IFetchStravaActivitiesResponse,
  IFetchStravaAthleteStatsResponse,
} from 'src/models';

export interface IStravaState {
  isAuthLoading: boolean;
  isActivitiesLoading: boolean;
  isAthleteLoading: boolean;
  isStatsLoading: boolean;
  authResponse?: IAuthenticateStravaResponse;
  activitiesResponse?: IFetchStravaActivitiesResponse;
  athleteResponse?: IFetchStravaAthleteResponse;
  athleteStatsResponse?: IFetchStravaAthleteStatsResponse;
}
