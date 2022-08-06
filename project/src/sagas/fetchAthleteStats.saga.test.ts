import { takeLatest } from 'redux-saga/effects';
import { fetchStravaAthleteStatsAction } from 'src/actions';

import {
  fetchStravaAthleteStatsSaga,
  fetchStravaAthleteStatsAsync,
} from 'src/sagas';

describe(`[saga] ${fetchStravaAthleteStatsSaga.name}`, () => {
  const genObject = fetchStravaAthleteStatsSaga();

  it(`should wait for every ${fetchStravaAthleteStatsAction.name} action and call authenticateWithStravaSaga`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(fetchStravaAthleteStatsAction, fetchStravaAthleteStatsAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
