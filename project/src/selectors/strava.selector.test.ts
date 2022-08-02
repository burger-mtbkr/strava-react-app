import { rootInitialState, TStoreState } from 'src/reducers';
import {
  mockAthlete,
  mockAthleteStats,
  mockDetailActivity,
  mockDistanceStream,
  mockStravaSession,
  mockElevationResults,
} from 'src/test/mocks';
import { mockSummaryActivities } from 'src/test/utils';

import {
  getAthlete,
  getStravaActivitiesIsLoading,
  getStravaActivityResponse,
  getStravaActivitiesResponse,
  getStravaAthleteIsLoading,
  getStravaAthleteResponse,
  getStravaAthleteStatsIsLoading,
  getStravaAthleteStatsResponse,
  getStravaAuthenticateResponse,
  getStravaAuthIsLoading,
  getElevationDataIsLoading,
  getActivityStreamIsLoading,
  getElevationDataResponse,
  getActivityStreamResponse,
} from './strava.selector';

const state: TStoreState = {
  ...rootInitialState,
  strava: {
    isAuthLoading: false,
    isActivitiesLoading: false,
    isActivityLoading: false,
    isAthleteLoading: false,
    isStatsLoading: false,
    isElevationDataLoading: false,
    isActivityStreamLoading: false,
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
    activityResponse: {
      isSuccessful: true,
      error: undefined,
      activity: mockDetailActivity,
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
    elevationResponse: {
      isSuccessful: true,
      error: undefined,
      results: mockElevationResults,
    },
    activityStreamResponse: {
      isSuccessful: true,
      error: undefined,
      stream: mockDistanceStream,
    },
  },
};

describe(`Strava selectors`, () => {
  it(`${getStravaAuthIsLoading.name} should return the correct state`, () => {
    expect(getStravaAuthIsLoading(state)).toEqual(false);
  });

  it(`${getStravaActivitiesIsLoading.name} should return the correct state`, () => {
    expect(getStravaActivitiesIsLoading(state)).toEqual(false);
  });

  it(`${getStravaAthleteIsLoading.name} should return the correct state`, () => {
    expect(getStravaAthleteIsLoading(state)).toEqual(false);
  });

  it(`${getStravaAthleteStatsIsLoading.name} should return the correct state`, () => {
    expect(getStravaAthleteStatsIsLoading(state)).toEqual(false);
  });

  it(`${getElevationDataIsLoading.name} should return the correct state`, () => {
    expect(getElevationDataIsLoading(state)).toEqual(false);
  });

  it(`${getActivityStreamIsLoading.name} should return the correct state`, () => {
    expect(getActivityStreamIsLoading(state)).toEqual(false);
  });

  it(`${getStravaAuthenticateResponse.name} should return the correct authResponse`, () => {
    expect(getStravaAuthenticateResponse(state)).toEqual({
      isSuccessful: true,
      error: undefined,
      stravaSession: mockStravaSession,
    });
  });

  it(`${getStravaActivitiesResponse.name} should return the correct activitiesResponse`, () => {
    expect(getStravaActivitiesResponse(state)).toStrictEqual({
      isSuccessful: true,
      error: undefined,
      activities: mockSummaryActivities,
    });
  });

  it(`${getStravaAthleteResponse.name} should return the correct athleteResponse`, () => {
    expect(getStravaAthleteResponse(state)).toEqual({
      isSuccessful: true,
      error: undefined,
      athlete: mockAthlete,
    });
  });

  it(`${getStravaAthleteStatsResponse.name} should return the correct mockAthleteStats`, () => {
    expect(getStravaAthleteStatsResponse(state)).toEqual({
      isSuccessful: true,
      error: undefined,
      athleteStats: mockAthleteStats,
    });
  });

  it(`${getAthlete.name} should return the correct athlete`, () => {
    expect(getAthlete(state)).toEqual(mockAthlete);
  });

  it(`${getStravaActivityResponse.name} should return the correct activity`, () => {
    expect(getStravaActivityResponse(state)).toEqual({
      isSuccessful: true,
      error: undefined,
      activity: mockDetailActivity,
    });
  });
  ///
  it(`${getElevationDataResponse.name} should return the correct activity`, () => {
    expect(getElevationDataResponse(state)).toEqual({
      isSuccessful: true,
      error: undefined,
      results: mockElevationResults,
    });
  });

  it(`${getActivityStreamResponse.name} should return the correct activity`, () => {
    expect(getActivityStreamResponse(state)).toEqual({
      isSuccessful: true,
      error: undefined,
      stream: mockDistanceStream,
    });
  });
});
