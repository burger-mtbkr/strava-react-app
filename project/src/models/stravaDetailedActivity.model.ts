/* eslint-disable camelcase */
import { AxiosError } from 'axios';
import { LatLng } from 'leaflet';
import { ActivityMap } from './stravaActivityMap.model';

import { AthleteBase, Equipment } from './stravaAthlete.model';
import { Lap } from './stravaLap.model';
import { PhotosSummary } from './stravaPhoto.model';
import { SegmentEffort } from './stravaSegment.model';

export type SplitMetric = {
  distance: number;
  elapsed_time: number;
  elevation_difference: number;
  moving_time: number;
  split: number;
  average_speed: number;
  pace_zone: number;
};

export type Kudoser = {
  destination_url: string;
  display_name: string;
  avatar_url: string;
  show_name: boolean;
};

export interface ActivityDetail {
  id: number;
  resource_state: number;
  athlete: AthleteBase;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time?: number;
  total_elevation_gain?: number;
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
  utc_offset: number;
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
  gear_id: string;
  from_accepted_tag: boolean;
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
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score?: number;
  description: string;
  calories?: number;
  segment_efforts?: Array<SegmentEffort>;
  splits_metric?: Array<SplitMetric>;
  laps?: Array<Lap>;
  gear?: Equipment;
  partner_brand_tag?: null;
  photos?: PhotosSummary;
  highlighted_kudosers?: Array<Kudoser>;
  hide_from_home: boolean;
  device_name: string;
  embed_token: string;
  segment_leaderboard_opt_out?: boolean;
  leaderboard_opt_out?: boolean;
}

export interface IFetchStravaActivityResponse {
  activity?: ActivityDetail | undefined;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}
