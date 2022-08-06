import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchStravaActivityStream } from 'src/api';
import {
  isActivityStreamLoadingAction,
  fetchActivityStreamAction,
  fetchActivityStreamDoneAction,
  clearActivityStreamAction,
} from 'src/actions';
import { ActivityStreamResponse, ActivityStreamRequest } from 'src/models';

export function* fetchActivityStreamAsync(action: {
  payload: ActivityStreamRequest;
}): SagaIterator {
  try {
    yield put(isActivityStreamLoadingAction(true));
    yield put(clearActivityStreamAction());

    const response: ActivityStreamResponse = yield call(
      fetchStravaActivityStream,
      action.payload,
    );

    yield put(fetchActivityStreamDoneAction(response));
  } catch (error) {
    yield put(
      fetchActivityStreamDoneAction({
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isActivityStreamLoadingAction(false));
  }
}

export function* fetchActivityStreamSaga(): SagaIterator {
  yield takeLatest(fetchActivityStreamAction, fetchActivityStreamAsync);
}
