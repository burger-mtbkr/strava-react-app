/* eslint-disable camelcase */
import { AxiosError } from 'axios';
import { StravaAthlete } from './stravaAthlete.model';

export interface IStravaSession {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: StravaAthlete;
}

export interface IAuthenticateStravaResponse {
  stravaSession?: IStravaSession | undefined;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}
