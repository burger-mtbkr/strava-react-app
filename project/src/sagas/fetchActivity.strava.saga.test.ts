import { takeLatest } from 'redux-saga/effects';
import { fetchStravaActivityAction } from 'src/actions';

import { fetchStravaActivitySaga, fetchStravaActivityAsync } from 'src/sagas';

describe(`[saga] ${fetchStravaActivitySaga.name}`, () => {
  const genObject = fetchStravaActivitySaga();

  it(`should wait for every ${fetchStravaActivityAction.name} action and call fetchStravaActivitySaga`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(fetchStravaActivityAction, fetchStravaActivityAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
