import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchStravaActivity } from 'src/api';
import {
  isActivityLoadingAction,
  fetchStravaActivityAction,
  fetchStravaActivityDoneAction,
  clearStravaActivityAction,
  clearActivityStreamAction,
} from 'src/actions';
import { IFetchStravaActivityResponse } from 'src/models';

export function* fetchStravaActivityAsync(action: {
  payload: number;
}): SagaIterator {
  try {
    yield put(isActivityLoadingAction(true));
    yield put(clearStravaActivityAction());
    yield put(clearActivityStreamAction());

    const response: IFetchStravaActivityResponse = yield call(
      fetchStravaActivity,
      action.payload,
    );

    yield put(fetchStravaActivityDoneAction(response));
  } catch (error) {
    yield put(
      fetchStravaActivityDoneAction({
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isActivityLoadingAction(false));
  }
}

export function* fetchStravaActivitySaga(): SagaIterator {
  yield takeLatest(fetchStravaActivityAction, fetchStravaActivityAsync);
}
