import { render, screen } from '@testing-library/react';
import { mockAthlete, mockStravaActivities, TestIds } from 'src/test/utils';
import ActivityItem from './ActivityItem';

describe(`${ActivityItem.name} tests`, () => {
  const activity = mockStravaActivities[0];
  const athlete = mockAthlete;

  beforeEach(() => {
    render(<ActivityItem activity={activity} athlete={athlete} />);
  });

  it(`should render the ${ActivityItem.name} component`, () => {
    const activityComponent = screen.getByTestId(
      TestIds.activityItemComponent(activity.id),
    );
    expect(activityComponent).toBeInTheDocument();
  });

  it(`should display the Activity name`, () => {
    const activityName = screen.getByText('Watopia');
    expect(activityName).toBeInTheDocument();
  });

  it(`should display the Activity distance`, () => {
    const activityDistance = screen.getByText('Distance: 20.12 km');
    expect(activityDistance).toBeInTheDocument();
  });

  it(`should display the Activity start date and time`, () => {
    const activityDateTime = screen.getByText('14-Nov-2021 16:23');
    expect(activityDateTime).toBeInTheDocument();
  });

  it(`should display the Activity duration`, () => {
    const activityDuration = screen.getByText('Moving Time: 47m 7s');
    expect(activityDuration).toBeInTheDocument();
  });

  it(`should display the Activity calories`, () => {
    const activityCalories = screen.getByText('Calories: 378.2');
    expect(activityCalories).toBeInTheDocument();
  });

  it(`should display the Activity Ave HR`, () => {
    const activityAveHeartRate = screen.getByText('Ave HR: 110.5 bpm');
    expect(activityAveHeartRate).toBeInTheDocument();
  });

  it(`should display the Activity Ave HR`, () => {
    const activityMaxHeartRate = screen.getByText('Max HR: 152 bpm');
    expect(activityMaxHeartRate).toBeInTheDocument();
  });

  it(`should display the Activity Elevation`, () => {
    const activityElevation = screen.getByText('Elevation: 167 m');
    expect(activityElevation).toBeInTheDocument();
  });
});
