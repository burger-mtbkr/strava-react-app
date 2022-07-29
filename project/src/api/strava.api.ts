import axios, { AxiosInstance } from 'axios';

export const stravaApi: AxiosInstance = axios.create({
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
