import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchStravaAthleteAction,
  fetchStravaAthleteDoneAction,
  isLoadingAction,
} from 'src/actions';
import { fetchStravaAthlete } from 'src/api';
import { IFetchStravaAthleteResponse } from 'src/models';

export function* fetchStravaAthleteAsync(): SagaIterator {
  try {
    yield put(isLoadingAction(true));
    const response: IFetchStravaAthleteResponse = yield call(
      fetchStravaAthlete,
    );

    yield put(fetchStravaAthleteDoneAction(response));
  } catch (error) {
    yield put(
      fetchStravaAthleteDoneAction({
        athlete: undefined,
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isLoadingAction(false));
  }
}

export function* fetchStravaAthleteSaga(): SagaIterator {
  yield takeLatest(fetchStravaAthleteAction, fetchStravaAthleteAsync);
}
