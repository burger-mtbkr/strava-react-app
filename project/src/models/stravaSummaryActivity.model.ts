/* eslint-disable camelcase */
import { AxiosError } from 'axios';
import { LatLng } from 'leaflet';
import { ActivityMap } from './stravaActivityMap.model';
import { AthleteBase } from './stravaAthlete.model';

export type ActivityBase = { id: number; resource_state: number };

export type SummaryActivity = ActivityBase & {
  athlete: AthleteBase;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time?: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  visibility: string;
  workout_type?: number;
  external_id: string;
  average_temp?: number;
  upload_id?: number;
  start_date: Date;
  start_date_local: Date;
  timezone: string;
  utc_offset?: number;
  start_latlng: LatLng;
  end_latlng: LatLng;
  location_city: null;
  location_state: null;
  location_country: string;
  achievement_count?: number;
  kudos_count?: number;
  comment_count?: number;
  athlete_count?: number;
  photo_count?: number;
  map: ActivityMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id?: string;
  from_accepted_tag?: boolean;
  average_speed?: number;
  max_speed?: number;
  average_cadence?: number;
  average_watts?: number;
  weighted_average_watts?: number;
  kilojoules?: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate?: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high?: number;
  elev_low?: number;
  upload_id_str: string;
  max_heartrate?: number;
  max_watts?: number;
  pr_count?: number;
  total_photo_count?: number;
  has_kudoed: boolean;
  suffer_score?: number;
};

export interface IFetchStravaActivitiesRequest {
  fromUnix: number;
  toUnix: number;
  page: number;
  itemCount: number;
}

export interface IFetchStravaActivitiesResponse {
  activities?: Array<SummaryActivity>;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}
