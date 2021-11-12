import {
  IAuthenticateStravaResponse,
  IFetchStravaAthleteResponse,
  IFetchStravaActivitiesResponse,
  IFetchStravaAthleteStatsResponse,
} from 'src/models';

export interface IStravaState {
  isLoading: boolean;
  activitiesResponse?: IFetchStravaActivitiesResponse[];
  stravaAuthResponse?: IAuthenticateStravaResponse;
  athleteResponse?: IFetchStravaAthleteResponse;
  athleteStatsResponse?: IFetchStravaAthleteStatsResponse;
}
