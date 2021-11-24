import { rootInitialState, TStoreState } from 'src/reducers';
import {
  mockStravaSession,
  mockStravaActivities,
  mockAthlete,
  mockAthleteStats,
} from './strava.mocks';

export const mockStoreState: TStoreState = {
  ...rootInitialState,
  strava: {
    isAuthLoading: false,
    isActivitiesLoading: false,
    isAthleteLoading: false,
    isStatsLoading: false,
    authResponse: {
      isSuccessful: true,
      error: undefined,
      stravaSession: mockStravaSession,
    },
    activitiesResponse: {
      isSuccessful: true,
      error: undefined,
      activities: mockStravaActivities,
    },
    athleteResponse: {
      isSuccessful: true,
      error: undefined,
      athlete: mockAthlete,
    },
    athleteStatsResponse: {
      isSuccessful: true,
      error: undefined,
      athleteStats: mockAthleteStats,
    },
  },
};
