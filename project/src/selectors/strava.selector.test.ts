import { rootInitialState, TStoreState } from 'src/reducers';
import {
  mockStravaSession,
  mockAthlete,
  mockAthleteStats,
} from 'src/test/utils';

import {
  getStravaActivitiesIsLoading,
  getStravaActivityResponse,
  getStravaAthleteIsLoading,
  getStravaAthleteResponse,
  getStravaAthleteStatsIsLoading,
  getStravaAthleteStatsResponse,
  getStravaAuthenticateResponse,
  getStravaAuthIsLoading,
} from './strava.selector';

const state: TStoreState = {
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
      activities: [],
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

  it(`${getStravaAuthenticateResponse.name} should return the correct authResponse`, () => {
    expect(getStravaAuthenticateResponse(state)).toEqual({
      isSuccessful: true,
      error: undefined,
      stravaSession: mockStravaSession,
    });
  });

  it(`${getStravaActivityResponse.name} should return the correct activitiesResponse`, () => {
    expect(getStravaActivityResponse(state)).toEqual({
      isSuccessful: true,
      error: undefined,
      activities: [],
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
});
