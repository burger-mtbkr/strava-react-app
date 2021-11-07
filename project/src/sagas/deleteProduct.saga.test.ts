import { takeLatest } from 'redux-saga/effects';
import { deleteProductAction } from 'src/actions';

import { deleteProductAsync, deleteProductSaga } from 'src/sagas';

describe(`[saga] ${deleteProductSaga.name}`, () => {
  const genObject = deleteProductSaga();

  it(`should wait for every ${deleteProductAction.name} action and call deleteProductSaga`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(deleteProductAction, deleteProductAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
