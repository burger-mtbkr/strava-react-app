import { AxiosResponse } from 'axios';

export const isSuccessfulResponse = (response: AxiosResponse): boolean =>
  // Ok
  response.status === 200 ||
  // Created
  response.status === 201 ||
  // Accepted
  response.status === 202 ||
  // Partial Info
  response.status === 203 ||
  // No content
  response.status === 204;
