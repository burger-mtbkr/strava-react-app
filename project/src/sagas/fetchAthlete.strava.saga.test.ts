import { takeLatest } from 'redux-saga/effects';
import { fetchStravaAthleteAction } from 'src/actions';

import { fetchStravaAthleteSaga, fetchStravaAthleteAsync } from 'src/sagas';

describe(`[saga] ${fetchStravaAthleteSaga.name}`, () => {
  const genObject = fetchStravaAthleteSaga();

  it(`should wait for every ${fetchStravaAthleteAction.name} action and call authenticateWithStravaSaga`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(fetchStravaAthleteAction, fetchStravaAthleteAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
