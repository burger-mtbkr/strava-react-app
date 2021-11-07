import axios, { AxiosInstance } from 'axios';

export const axiosApi: AxiosInstance = axios.create({
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
