import axios, { AxiosInstance } from 'axios';

export const openElevationApi: AxiosInstance = axios.create({
  baseURL: 'https://api.open-elevation.com/api/v1/',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
