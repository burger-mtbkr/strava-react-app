import { IFetchStravaAthleteResponse } from './stravaAthlete.model';
import { IFetchStravaAthleteStatsResponse } from './stravaAthleteStats.model';
import { IFetchStravaActivityResponse } from './stravaDetailedActivity.model';
import { IAuthenticateStravaResponse } from './stravaSession.model';
import { IFetchStravaActivitiesResponse } from './stravaSummaryActivity.model';

export interface IStravaState {
  isAuthLoading: boolean;
  isActivitiesLoading: boolean;
  isActivityLoading: boolean;
  isAthleteLoading: boolean;
  isStatsLoading: boolean;
  authResponse?: IAuthenticateStravaResponse;
  activitiesResponse?: IFetchStravaActivitiesResponse;
  activityResponse?: IFetchStravaActivityResponse;
  athleteResponse?: IFetchStravaAthleteResponse;
  athleteStatsResponse?: IFetchStravaAthleteStatsResponse;
}
