import { LatLng } from 'leaflet';
import axios, { AxiosResponse } from 'axios';

import { isSuccessfulResponse } from 'src/utils';
import {
  ElevationRequest,
  ElevationResponse,
  ElevationResults,
} from 'src/models/elevation.model';
import { openElevationApi } from './openElevation.api';

export const fetchElevationData = async (
  elevationRequest: ElevationRequest,
): Promise<ElevationResponse> => {
  try {
    const elevationResponse: AxiosResponse<unknown> =
      await openElevationApi.post('lookup', elevationRequest);

    if (isSuccessfulResponse(elevationResponse)) {
      if (elevationResponse.data) {
        const { results } = elevationResponse.data as ElevationResults;
        const elevationResponseData: Array<LatLng> = [];
        results.forEach((l) =>
          elevationResponseData.push(
            new LatLng(l.latitude, l.longitude, l.elevation),
          ),
        );
        return {
          results: elevationResponseData,
          isSuccessful: true,
        };
      }
    }
    throw new Error(elevationResponse.statusText);
  } catch (error) {
    return {
      isSuccessful: false,
      error: axios.isAxiosError(error)
        ? error
        : new Error('An error has occured'),
    };
  }
};
