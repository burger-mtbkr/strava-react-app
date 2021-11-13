import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IAuthenticateStravaResponse } from 'src/models';
import { authenticateWithStrava } from 'src/api';
import {
  authenticateWithStravaAction,
  authenticateWithStravaDoneAction,
  isAuthLoadingAction,
} from 'src/actions';

export function* authenticateWithStravaAsync(action: {
  payload: string | undefined;
}): SagaIterator {
  try {
    yield put(isAuthLoadingAction(true));
    const response: IAuthenticateStravaResponse = yield call(
      authenticateWithStrava,
      action.payload,
    );

    yield put(authenticateWithStravaDoneAction(response));
  } catch (error) {
    yield put(
      authenticateWithStravaDoneAction({
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isAuthLoadingAction(false));
  }
}

export function* authenticateWithStravaSaga(): SagaIterator {
  yield takeLatest(authenticateWithStravaAction, authenticateWithStravaAsync);
}
