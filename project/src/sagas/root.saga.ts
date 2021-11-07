import { all } from 'redux-saga/effects';
import { fetchAllProductsSaga } from './fetchProducts.saga';
import { deleteProductSaga } from './deleteProduct.saga';
import { saveProductSaga } from './saveProduct.saga';

export default function* rootSaga() {
  yield all([deleteProductSaga(), fetchAllProductsSaga(), saveProductSaga()]);
}
