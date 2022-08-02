import { all } from 'redux-saga/effects';
import { authenticateWithStravaSaga } from './authenticate.strava.saga';
import { fetchStravaActivitiesSaga } from './fetchActivities.strava.saga';
import { fetchStravaAthleteSaga } from './fetchAthlete.strava.saga';
import { fetchStravaAthleteStatsSaga } from './fetchAthleteStats.strava.saga';
import { fetchStravaActivitySaga } from './fetchActivity.strava.saga';
import { fetchElevationDataSaga } from './fetchElevationData.saga';

export default function* rootSaga() {
  yield all([
    authenticateWithStravaSaga(),
    fetchStravaActivitiesSaga(),
    fetchStravaAthleteSaga(),
    fetchStravaAthleteStatsSaga(),
    fetchStravaActivitySaga(),
    fetchElevationDataSaga(),
  ]);
}
