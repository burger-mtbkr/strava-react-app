import {
  isActivitiesLoadingAction,
  isAthleteLoadingAction,
  isStatsLoadingActions,
  isAuthLoadingAction,
  authenticateWithStravaDoneAction,
  fetchStravaActivitiesDoneAction,
  fetchStravaAthleteStatsDoneAction,
  fetchStravaAthleteDoneAction,
} from 'src/actions';
import {
  IAuthenticateStravaResponse,
  IFetchStravaActivitiesResponse,
  IFetchStravaAthleteResponse,
  IFetchStravaAthleteStatsResponse,
} from 'src/models';
import reducer, { stravaInitialState } from 'src/reducers/strava.reducer';
import {
  mockStravaSession,
  mockAthlete,
  mockAthleteStats,
} from 'src/test/utils';

describe(`[reducers] app reducer`, () => {
  it(`reduces ${isActivitiesLoadingAction.name} correctly`, () => {
    const state = reducer(stravaInitialState, isActivitiesLoadingAction(true));
    expect(state.isActivitiesLoading).toEqual(true);
  });
  it(`reduces ${isAthleteLoadingAction.name} correctly`, () => {
    const state = reducer(stravaInitialState, isAthleteLoadingAction(true));
    expect(state.isAthleteLoading).toEqual(true);
  });
  it(`reduces ${isStatsLoadingActions.name} correctly`, () => {
    const state = reducer(stravaInitialState, isStatsLoadingActions(true));
    expect(state.isStatsLoading).toEqual(true);
  });
  it(`reduces ${isAuthLoadingAction.name} correctly`, () => {
    const state = reducer(stravaInitialState, isAuthLoadingAction(true));
    expect(state.isAuthLoading).toEqual(true);
  });
  it(`reduces ${authenticateWithStravaDoneAction.name} correctly`, () => {
    const response: IAuthenticateStravaResponse = {
      isSuccessful: true,
      stravaSession: mockStravaSession,
    };

    const state = reducer(
      stravaInitialState,
      authenticateWithStravaDoneAction(response),
    );
    expect(state.authResponse).toEqual(response);
  });

  it(`reduces ${fetchStravaActivitiesDoneAction.name} correctly`, () => {
    const response: IFetchStravaActivitiesResponse = {
      isSuccessful: true,
      activities: [],
    };

    const state = reducer(
      stravaInitialState,
      fetchStravaActivitiesDoneAction(response),
    );
    expect(state.activitiesResponse).toEqual(response);
  });

  it(`reduces ${fetchStravaAthleteDoneAction.name} correctly`, () => {
    const response: IFetchStravaAthleteResponse = {
      isSuccessful: true,
      athlete: mockAthlete,
    };

    const state = reducer(
      stravaInitialState,
      fetchStravaAthleteDoneAction(response),
    );
    expect(state.athleteResponse).toEqual(response);
  });

  it(`reduces ${fetchStravaAthleteStatsDoneAction.name} correctly`, () => {
    const response: IFetchStravaAthleteStatsResponse = {
      isSuccessful: true,
      athleteStats: mockAthleteStats,
    };

    const state = reducer(
      stravaInitialState,
      fetchStravaAthleteStatsDoneAction(response),
    );
    expect(state.athleteStatsResponse).toEqual(response);
  });
});
