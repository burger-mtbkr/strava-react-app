import { takeLatest } from 'redux-saga/effects';
import { fetchElevationDataAction } from 'src/actions';
import {
  fetchElevationDataAsync,
  fetchElevationDataSaga,
} from './fetchElevationData.saga';

describe(`[saga] ${fetchElevationDataSaga.name}`, () => {
  const genObject = fetchElevationDataSaga();

  it(`should wait for every ${fetchElevationDataAction.name} action and call fetchElevationDataSaga`, () => {
    expect(genObject.next().value).toEqual(
      takeLatest(fetchElevationDataAction, fetchElevationDataAsync),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
