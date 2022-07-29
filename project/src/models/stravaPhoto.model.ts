/* eslint-disable camelcase */

export type PhotosSummaryPrimary = {
  id?: null;
  unique_id: string;
  urls: {
    '100': string;
    '600': string;
  };
  source: number;
};

export type PhotosSummary = {
  primary: PhotosSummaryPrimary;
  use_primary_photo: boolean;
  count: number;
};
