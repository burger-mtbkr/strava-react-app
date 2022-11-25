/* eslint-disable testing-library/no-render-in-setup */
import { screen } from '@testing-library/react';
import { mockStoreState, renderWithRedux } from 'src/test/utils';
import Stats from './Stats';

describe(`${Stats.name} tests`, () => {
  const props = {
    distance: 1051566.7275390625,
    moving_time: 148059,
    elapsed_time: 153348,
    elevation_gain: 12208.448608398438,
    count: 24,
    achievement_count: 2,
  };

  beforeEach(() => {
    renderWithRedux(<Stats {...props} />, {
      initialState: mockStoreState,
    });
  });

  it(`should render the Total distance label`, () => {
    const totalDistanceLabel = screen.getByText('Total distance:');
    expect(totalDistanceLabel).toBeInTheDocument();
  });
  it(`should render the Total distance value`, () => {
    const totalDistanceValue = screen.getByText('1051.57 km');
    expect(totalDistanceValue).toBeInTheDocument();
  });

  it(`should render the Moving time label`, () => {
    const movingTimeLabel = screen.getByText('Moving time:');
    expect(movingTimeLabel).toBeInTheDocument();
  });
  it(`should render the Moving time value`, () => {
    const movingTimeValue = screen.getByText('41h 7m 39s');
    expect(movingTimeValue).toBeInTheDocument();
  });

  it(`should render the Elevation gain label`, () => {
    const elevationGainLabel = screen.getByText('Elevation gain:');
    expect(elevationGainLabel).toBeInTheDocument();
  });
  it(`should render the Elevation gain value`, () => {
    const elevationGainValue = screen.getByText('12208.45 m');
    expect(elevationGainValue).toBeInTheDocument();
  });

  it(`should render the Activity count label`, () => {
    const activityCountLabel = screen.getByText('Activity count:');
    expect(activityCountLabel).toBeInTheDocument();
  });
  it(`should render the Activity count value`, () => {
    const activityCountValue = screen.getByText('24');
    expect(activityCountValue).toBeInTheDocument();
  });

  it(`should render the Achievement count label`, () => {
    const achievementCountLabel = screen.getByText('Achievement count:');
    expect(achievementCountLabel).toBeInTheDocument();
  });
  it(`should render the Achievement count value`, () => {
    const achievementCountValue = screen.getByText('2');
    expect(achievementCountValue).toBeInTheDocument();
  });
});
