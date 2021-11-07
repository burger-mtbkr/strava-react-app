import {
  IStravaAthlete,
  IAthleteStats,
  IStravaActivity,
  IStravaSession,
} from 'src/models';

export interface IStravaState {
  isLoading: boolean;
  athlete?: IStravaAthlete;
  athleteStats?: IAthleteStats;
  activities?: IStravaActivity[];
  stravaSession?: IStravaSession;
}
