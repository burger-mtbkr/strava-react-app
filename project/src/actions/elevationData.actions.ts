import { createAction } from '@reduxjs/toolkit';
import {
  ElevationRequest,
  ElevationResponse,
} from 'src/models/elevation.model';

const ELEVATION_PREFIX = 'OPEN_ELEVATION';

export const isElevationDataLoadingAction = createAction<boolean>(
  `${ELEVATION_PREFIX}/API/IS_LOADING_ELEVATION_DATA`,
);

export const fetchElevationDataAction = createAction<ElevationRequest>(
  `${ELEVATION_PREFIX}/API/_FETCH_ELEVATION_DATA`,
);

export const fetchElevationDataDoneAction = createAction<ElevationResponse>(
  `${ELEVATION_PREFIX}/API/_FETCH_ELEVATION_DONE`,
);
