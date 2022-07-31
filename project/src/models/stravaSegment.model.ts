/* eslint-disable camelcase */
import { LatLng } from 'leaflet';
import { AthleteBase } from './stravaAthlete.model';
import { ActivityBase } from './stravaSummaryActivity.model';

export type Segment = {
  id: number;
  resource_state: number;
  name: string;
  activity_type: string;
  distance: number;
  average_grade: number;
  maximum_grade: number;
  elevation_high: number;
  elevation_low: number;
  start_latlng: LatLng;
  end_latlng: LatLng;
  climb_category: number;
  city: string;
  state: string;
  country: string;
  private: boolean;
  hazardous: boolean;
  starred: boolean;
};

export type SegmentEffort = {
  id: number;
  resource_state: number;
  name: string;
  activity: ActivityBase;
  athlete: AthleteBase;
  elapsed_time: number;
  moving_time: number;
  start_date: Date;
  start_date_local: Date;
  distance: number;
  start_index: number;
  end_index: number;
  average_cadence: number;
  device_watts: boolean;
  average_watts: number;
  segment: Segment;
  kom_rank?: null;
  pr_rank?: null;
  achievements?: unknown;
  hidden: boolean;
};
