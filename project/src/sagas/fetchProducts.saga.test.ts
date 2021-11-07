import { takeLatest } from 'redux-saga/effects';
import { fetchProductAction } from 'src/actions';
import { fetchProductSaga, fetchProductsAsync } from 'src/sagas';

describe(`[saga] ${fetchProductSaga.name}`, () => {
  const genObject = fetchProductSaga();

  it(`should wait for every ${fetchProductAction.name} action and call fetchProductsAsync`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(fetchProductAction, fetchProductsAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
