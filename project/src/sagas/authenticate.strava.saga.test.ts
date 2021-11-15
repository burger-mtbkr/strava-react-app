import { takeLatest } from 'redux-saga/effects';
import { authenticateWithStravaAction } from 'src/actions';

import {
  authenticateWithStravaSaga,
  authenticateWithStravaAsync,
} from 'src/sagas';

describe(`[saga] ${authenticateWithStravaSaga.name}`, () => {
  const genObject = authenticateWithStravaSaga();

  it(`should wait for every ${authenticateWithStravaAction.name} action and call authenticateWithStravaSaga`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(authenticateWithStravaAction, authenticateWithStravaAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
