/* eslint-disable camelcase */
import { AxiosError } from 'axios';
import { IStravaAthlete } from 'src/models';

export interface IActivityMap {
  id: string;
  summary_polyline?: string;
  resource_state: number;
}

export interface IStravaActivity {
  resource_state: number;
  athlete: IStravaAthlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  workout_type?: number;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: Date;
  start_date_local: Date;
  timezone: string;
  utc_offset: number;
  start_latlng?: Array<number>;
  end_latlng?: Array<number>;
  location_city?: string;
  location_state?: string;
  location_country: string;
  start_latitude: number;
  start_longitude: number;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: IActivityMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: boolean;
  average_temp?: number;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  weighted_average_watts?: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  max_watts?: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score?: number;
  visibility?: string;
  upload_id_str?: string;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
}
export interface IFetchStravaActivitiesRequest {
  fromUnix: number;
  toUnix: number;
  page: number;
  itemCount: number;
}

export interface IFetchStravaActivitiesResponse {
  activities?: IStravaActivity[];
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}
