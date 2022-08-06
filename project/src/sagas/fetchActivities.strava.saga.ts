import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchStravaActivities } from 'src/api';
import {
  isActivitiesLoadingAction,
  fetchStravaActivitiesAction,
  fetchStravaActivitiesDoneAction,
  clearStravaActivityAction,
  clearActivityStreamAction,
} from 'src/actions';
import {
  IFetchStravaActivitiesRequest,
  IFetchStravaActivitiesResponse,
} from 'src/models';

export function* fetchStravaActivitiesAsync(action: {
  payload: IFetchStravaActivitiesRequest;
}): SagaIterator {
  try {
    yield put(isActivitiesLoadingAction(true));
    yield put(clearStravaActivityAction());
    yield put(clearActivityStreamAction());

    const response: IFetchStravaActivitiesResponse = yield call(
      fetchStravaActivities,
      action.payload,
    );

    yield put(fetchStravaActivitiesDoneAction(response));
  } catch (error) {
    yield put(
      fetchStravaActivitiesDoneAction({
        activities: [],
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(isActivitiesLoadingAction(false));
  }
}

export function* fetchStravaActivitiesSaga(): SagaIterator {
  yield takeLatest(fetchStravaActivitiesAction, fetchStravaActivitiesAsync);
}
