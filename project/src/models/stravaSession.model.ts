/* eslint-disable camelcase */
import { IStravaAthlete } from 'src/models';

export interface IStravaSession {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: IStravaAthlete;
}
