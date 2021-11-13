import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchStravaAthleteStatsAction,
  fetchStravaAthleteStatsDoneAction,
  isStatsLoadingActions,
} from 'src/actions';
import { getAthleteStats } from 'src/api';
import { IFetchStravaAthleteStatsResponse } from 'src/models';

export function* fetchStravaAthleteStatsAsync(): SagaIterator {
  try {
    yield put(isStatsLoadingActions(true));
    const response: IFetchStravaAthleteStatsResponse = yield call(
      getAthleteStats,
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
    yield put(isStatsLoadingActions(false));
  }
}

export function* fetchStravaAthleteStatsSaga(): SagaIterator {
  yield takeLatest(fetchStravaAthleteStatsAction, fetchStravaAthleteStatsAsync);
}
