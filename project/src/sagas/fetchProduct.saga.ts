import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { IProductResponse } from 'src/models/product.model';
import { getProduct } from 'src/api';
import { fetchProductDoneAction, fetchProductAction } from 'src/actions';

export function* fetchProductsAsync(action: { payload: string }): SagaIterator {
  try {
    // yield put(isLoadingAction(true));
    const response: IProductResponse = yield call(getProduct, action.payload);

    yield put(fetchProductDoneAction(response));
  } catch (error) {
    yield put(
      fetchProductDoneAction({
        product: undefined,
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    // yield put(isLoadingAction(false));
  }
}

export function* fetchProductSaga(): SagaIterator {
  yield takeLatest(fetchProductAction, fetchProductsAsync);
}
