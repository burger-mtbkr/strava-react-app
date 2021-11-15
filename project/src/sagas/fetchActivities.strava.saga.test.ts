import { takeLatest } from 'redux-saga/effects';
import { fetchStravaActivitiesAction } from 'src/actions';

import {
  fetchStravaActivitiesSaga,
  fetchStravaActivitiesAsync,
} from 'src/sagas';

describe(`[saga] ${fetchStravaActivitiesSaga.name}`, () => {
  const genObject = fetchStravaActivitiesSaga();

  it(`should wait for every ${fetchStravaActivitiesAction.name} action and call authenticateWithStravaSaga`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(fetchStravaActivitiesAction, fetchStravaActivitiesAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
