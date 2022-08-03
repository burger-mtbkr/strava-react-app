import { StreamSet } from 'src/models';

export const mockStreamSet: StreamSet = {
  distance: {
    data: [
      200.9, 500.8, 800.5, 1100.7, 1500, 1900, 2300.2, 2800, 3200.8, 3800.1,
    ],
    series_type: 'distance',
    original_size: 10,
    resolution: 'high',
  },
  altitude: {
    data: [18, 19, 20.2, 22.2, 22.4, 22.6, 23.6, 24.6, 24.4, 23.2],
    series_type: 'distance',
    original_size: 10,
    resolution: 'high',
  },
};
