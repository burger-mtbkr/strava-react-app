/* eslint-disable camelcase */

import { AthleteBase } from './stravaAthlete.model';
import { ActivityBase } from './stravaSummaryActivity.model';

export type Lap = {
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
  total_elevation_gain: number;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  device_watts: boolean;
  average_watts: number;
  lap_index: number;
  split: number;
};
