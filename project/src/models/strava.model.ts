import {
  IAuthenticateStravaResponse,
  IFetchStravaAthleteResponse,
  IFetchStravaActivitiesResponse,
  IFetchStravaAthleteStatsResponse,
} from 'src/models';

export interface IStravaState {
  isLoading: boolean;
  authResponse?: IAuthenticateStravaResponse;
  activitiesResponse?: IFetchStravaActivitiesResponse;
  athleteResponse?: IFetchStravaAthleteResponse;
  athleteStatsResponse?: IFetchStravaAthleteStatsResponse;
}
