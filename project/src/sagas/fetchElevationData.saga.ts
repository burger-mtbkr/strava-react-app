import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchElevationData } from 'src/api';
import {
  isElevationDataLoadingAction,
  fetchElevationDataAction,
  fetchElevationDataDoneAction,
} from 'src/actions';
import { ElevationRequest, ElevationResponse } from 'src/models';

export function* fetchElevationDataAsync(action: {
  payload: ElevationRequest;
}): SagaIterator {
  try {
    yield put(isElevationDataLoadingAction(true));

    const response: ElevationResponse = yield call(
      fetchElevationData,
      action.payload,
    );

    yield put(fetchElevationDataDoneAction(response));
  } catch (error) {
    yield put(
      fetchElevationDataDoneAction({
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isElevationDataLoadingAction(false));
  }
}

export function* fetchElevationDataSaga(): SagaIterator {
  yield takeLatest(fetchElevationDataAction, fetchElevationDataAsync);
}
