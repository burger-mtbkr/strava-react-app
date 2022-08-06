import { takeLatest } from 'redux-saga/effects';
import { fetchActivityStreamAction } from 'src/actions';

import { fetchActivityStreamSaga, fetchActivityStreamAsync } from 'src/sagas';

describe(`[saga] ${fetchActivityStreamSaga.name}`, () => {
  const genObject = fetchActivityStreamSaga();

  it(`should wait for every ${fetchActivityStreamAction.name}
  action and call fetchActivity Stream`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(fetchActivityStreamAction, fetchActivityStreamAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
