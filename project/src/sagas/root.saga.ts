import { all } from 'redux-saga/effects';
import { authenticateWithStravaSaga } from './authenticate.strava.saga';
import { fetchStravaActivitiesSaga } from './fetchActivities.strava.saga';
import { fetchStravaAthleteSaga } from './fetchAthelete.strava.saga';
import { fetchStravaAthleteStatsSaga } from './fetchAthleteStats.strava.saga';

export default function* rootSaga() {
  yield all([
    authenticateWithStravaSaga(),
    fetchStravaActivitiesSaga(),
    fetchStravaAthleteSaga(),
    fetchStravaAthleteStatsSaga(),
  ]);
}