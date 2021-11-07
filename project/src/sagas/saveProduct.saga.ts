import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IProductResponse, Product } from 'src/models';
import { saveProduct } from 'src/api';
import {
  saveProductAction,
  setSaveProductDoneAction,
  isSavingAction,
} from 'src/actions';

export function* saveProductAsync(action: { payload: Product }): SagaIterator {
  try {
    yield put(isSavingAction(true));

    const response: IProductResponse = yield call(saveProduct, action.payload);
    yield put(setSaveProductDoneAction(response));
  } catch (error) {
    yield put(
      setSaveProductDoneAction({
        product: action.payload,
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isSavingAction(false));
  }
}

export function* saveProductSaga(): SagaIterator {
  yield takeLatest(saveProductAction, saveProductAsync);
}
