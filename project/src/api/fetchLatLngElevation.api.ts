/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { LatLng } from 'leaflet';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { isSuccessfulResponse } from 'src/utils';
import {
  ElevationRequest,
  ElevationResponse,
} from 'src/models/elevationResponse.model';
import { openElevationApi } from './openElevation.api';

export const fetchLatLngElevation = async (
  elevationRequest: ElevationRequest,
): Promise<Array<LatLng> | Error | AxiosError> => {
  try {
    const elevationResponse: AxiosResponse<unknown> =
      await openElevationApi.post('lookup', elevationRequest);

    if (isSuccessfulResponse(elevationResponse)) {
      if (elevationResponse.data) {
        const { results } = elevationResponse.data as ElevationResponse;
        const elevationResponseData: Array<LatLng> = [];
        results.forEach((l) =>
          elevationResponseData.push(
            new LatLng(l.latitude, l.longitude, l.elevation),
          ),
        );
        return elevationResponseData;
      }
    }
    throw new Error(elevationResponse.statusText);
  } catch (error) {
    return axios.isAxiosError(error)
      ? error
      : new Error('An error has occured');
  }
};
