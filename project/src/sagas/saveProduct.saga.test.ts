import { takeLatest } from 'redux-saga/effects';
import { saveProductAction } from 'src/actions';
import { saveProductAsync, saveProductSaga } from 'src/sagas';

describe(`[saga] ${saveProductSaga.name}`, () => {
  const genObject = saveProductSaga();

  it(`should wait for every ${saveProductAction.name} action and call deleteProductSaga`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(saveProductAction, saveProductAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
