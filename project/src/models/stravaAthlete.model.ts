/* eslint-disable camelcase */
export interface IEquipment {
  id: string;
  primary: boolean;
  name: string;
  resource_state: number;
  distance: number;
}

export interface IStravaAthlete {
  id: number;
  resource_state: number;
  username: string;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  profile_medium: string;
  profile: string;
  friend: any;
  follower: any;
  follower_count: number;
  friend_count: number;
  mutual_friend_count: number;
  athlete_type: number;
  date_preference: string;
  measurement_preference: string;
  clubs: Array<any>;
  ftp: any;
  weight: number;
  bikes: Array<IEquipment>;
  shoes: Array<IEquipment>;
}
