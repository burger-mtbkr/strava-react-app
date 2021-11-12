import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchStravaAthleteStatsAction,
  fetchStravaAthleteStatsDoneAction,
  isLoadingAction,
} from 'src/actions';
import { fetchStravaAthlete } from 'src/api';
import { IFetchStravaAthleteResponse } from 'src/models';

export function* fetchStravaAthleteStatsAsync(): SagaIterator {
  try {
    yield put(isLoadingAction(true));
    const response: IFetchStravaAthleteResponse = yield call(
      fetchStravaAthlete,
    );

    yield put(fetchStravaAthleteStatsDoneAction(response));
  } catch (error) {
    yield put(
      fetchStravaAthleteStatsDoneAction({
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isLoadingAction(false));
  }
}

export function* fetchStravaAthleteStatsSaga(): SagaIterator {
  yield takeLatest(fetchStravaAthleteStatsAction, fetchStravaAthleteStatsAsync);
}
