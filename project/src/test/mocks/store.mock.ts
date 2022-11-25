import { rootInitialState, TStoreState } from 'src/reducers';
import { mockSummaryActivities } from './activities.mock';
import { mockAthlete, mockAthleteStats } from './athlete.mock';
import { mockStravaSession } from './session.mock';

export const mockStoreState: TStoreState = {
  ...rootInitialState,
  strava: {
    isElevationDataLoading: false,
    isActivityStreamLoading: false,
    isAuthLoading: false,
    isActivitiesLoading: false,
    isActivityLoading: false,
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
      activities: mockSummaryActivities,
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
    activityResponse: undefined,
    elevationResponse: undefined,
    activityStreamResponse: undefined,
  },
};
