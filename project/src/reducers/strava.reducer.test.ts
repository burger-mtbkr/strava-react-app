import {
  isActivitiesLoadingAction,
  isAthleteLoadingAction,
  isStatsLoadingActions,
  isAuthLoadingAction,
  authenticateWithStravaDoneAction,
  fetchStravaActivitiesDoneAction,
  fetchStravaAthleteStatsDoneAction,
  fetchStravaAthleteDoneAction,
  isActivityLoadingAction,
  fetchStravaActivityDoneAction,
  isElevationDataLoadingAction,
  fetchElevationDataDoneAction,
  isActivityStreamLoadingAction,
  fetchActivityStreamAction,
  fetchActivityStreamDoneAction,
} from 'src/actions';
import {
  ActivityStreamResponse,
  ElevationResponse,
  IAuthenticateStravaResponse,
  IFetchStravaActivitiesResponse,
  IFetchStravaActivityResponse,
  IFetchStravaAthleteResponse,
  IFetchStravaAthleteStatsResponse,
} from 'src/models';
import reducer, { stravaInitialState } from 'src/reducers/strava.reducer';
import {
  mockAthlete,
  mockAthleteStats,
  mockDetailActivity,
  mockDistanceStream,
  mockStravaSession,
} from 'src/test/mocks';
import { mockSummaryActivities } from 'src/test/utils';
import { mockElevationResults } from 'src/test/mocks/elevation.mock';

describe(`[reducers] app reducer`, () => {
  it(`reduces ${isActivitiesLoadingAction.name} correctly`, () => {
    const state = reducer(stravaInitialState, isActivitiesLoadingAction(true));
    expect(state.isActivitiesLoading).toEqual(true);
  });

  it(`reduces ${isActivityLoadingAction.name} correctly`, () => {
    const state = reducer(stravaInitialState, isActivityLoadingAction(true));
    expect(state.isActivityLoading).toEqual(true);
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

  it(`reduces ${isElevationDataLoadingAction.name} correctly`, () => {
    const state = reducer(
      stravaInitialState,
      isElevationDataLoadingAction(true),
    );
    expect(state.isElevationDataLoading).toEqual(true);
  });

  it(`reduces ${isActivityStreamLoadingAction.name} correctly`, () => {
    const state = reducer(
      stravaInitialState,
      isActivityStreamLoadingAction(true),
    );
    expect(state.isActivityStreamLoading).toEqual(true);
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
      activities: mockSummaryActivities,
    };

    const state = reducer(
      stravaInitialState,
      fetchStravaActivitiesDoneAction(response),
    );
    expect(state.activitiesResponse).toEqual(response);
  });

  it(`reduces ${fetchStravaActivityDoneAction.name} correctly`, () => {
    const response: IFetchStravaActivityResponse = {
      isSuccessful: true,
      activity: mockDetailActivity,
    };

    const state = reducer(
      stravaInitialState,
      fetchStravaActivityDoneAction(response),
    );
    expect(state.activityResponse).toEqual(response);
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

  it(`reduces ${fetchElevationDataDoneAction.name} correctly`, () => {
    const response: ElevationResponse = {
      isSuccessful: true,
      results: mockElevationResults,
    };

    const state = reducer(
      stravaInitialState,
      fetchElevationDataDoneAction(response),
    );
    expect(state.elevationResponse).toEqual(response);
  });

  it(`reduces ${fetchActivityStreamAction.name} correctly`, () => {
    const response: ActivityStreamResponse = {
      isSuccessful: true,
      stream: mockDistanceStream,
    };

    const state = reducer(
      stravaInitialState,
      fetchActivityStreamDoneAction(response),
    );
    expect(state.activityStreamResponse).toEqual(response);
  });
});
