import { takeLatest } from 'redux-saga/effects';
import { fetchAllProductsAction } from 'src/actions';

import { fetchAllProductsAsync, fetchAllProductsSaga } from 'src/sagas';

describe(`[saga] ${fetchAllProductsSaga.name}`, () => {
  const genObject = fetchAllProductsSaga();

  it(`should wait for every ${fetchAllProductsAction.name} action and call fetchAllProductsSaga`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(fetchAllProductsAction, fetchAllProductsAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
