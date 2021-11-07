/* eslint-disable camelcase */
import { AxiosError } from 'axios';
import { IStravaAthlete } from 'src/models';

export interface IStravaSession {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: IStravaAthlete;
}

export interface IAuthenticateStravaResponse {
  products?: IStravaSession;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}
