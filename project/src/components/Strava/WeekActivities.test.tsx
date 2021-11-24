import { screen } from '@testing-library/react';
import { mockStoreState, renderWithRedux } from 'src/test/utils';
import WeekActivities from './WeekActivities';

describe(`${WeekActivities.name} tests`, () => {
  describe('when strava is connected', () => {
    beforeEach(() => {
      renderWithRedux(<WeekActivities />, {
        initialState: mockStoreState,
      });
    });

    it(`should render the Current week Activities list`, () => {
      const activitiesHeading = screen.getByText('Current Week Activities');
      expect(activitiesHeading).toBeInTheDocument();
    });

    it(`should display the first activity in the list`, () => {
      const activityName = screen.getByText('Watopia');
      expect(activityName).toBeInTheDocument();

      // const activityDate = screen.getByText('14-Nov-2021 16:23');
      // expect(activityDate).toBeInTheDocument();

      const activityDistance = screen.getByText('Distance: 20.12 km');
      expect(activityDistance).toBeInTheDocument();

      const activityTime = screen.getByText('Moving Time: 47m 7s');
      expect(activityTime).toBeInTheDocument();

      const activityCalories = screen.getByText('Calories: 378.2');
      expect(activityCalories).toBeInTheDocument();

      const activityAveHr = screen.getByText('Ave HR: 110.5 bpm');
      expect(activityAveHr).toBeInTheDocument();

      const activityElevation = screen.getByText('Elevation: 167 m');
      expect(activityElevation).toBeInTheDocument();
    });

    it(`should display the second activity in the list`, () => {
      const activityName = screen.getByText(
        'Ascenders Team Singapore Zwift Ride',
      );
      expect(activityName).toBeInTheDocument();

      // const activityDate = screen.getByText('13-Nov-2021 11:30');
      // expect(activityDate).toBeInTheDocument();

      const activityDistance = screen.getByText('Distance: 100.45 km');
      expect(activityDistance).toBeInTheDocument();

      const activityTime = screen.getByText('Moving Time: 2h 28m 49s');
      expect(activityTime).toBeInTheDocument();

      const activityCalories = screen.getByText('Calories: 1835.3');
      expect(activityCalories).toBeInTheDocument();

      const activityAveHr = screen.getByText('Ave HR: 157.6 bpm');
      expect(activityAveHr).toBeInTheDocument();

      const maxHr = screen.getByText('Max HR: 177 bpm');
      expect(maxHr).toBeInTheDocument();

      const activityElevation = screen.getByText('Elevation: 316 m');
      expect(activityElevation).toBeInTheDocument();
    });

    it(`should display the third activity in the list`, () => {
      const activityName = screen.getByText('Afternoon Ride');
      expect(activityName).toBeInTheDocument();

      // const activityDate = screen.getByText('10-Nov-2021 15:19');
      // expect(activityDate).toBeInTheDocument();

      const activityDistance = screen.getByText('Distance: 25.66 km');
      expect(activityDistance).toBeInTheDocument();

      const activityTime = screen.getByText('Moving Time: 1h 0m 41s');
      expect(activityTime).toBeInTheDocument();

      const activityCalories = screen.getByText('Calories: 463.6');
      expect(activityCalories).toBeInTheDocument();

      const activityAveHr = screen.getByText('Ave HR: 124 bpm');
      expect(activityAveHr).toBeInTheDocument();

      const activityElevation = screen.getByText('Elevation: 276 m');
      expect(activityElevation).toBeInTheDocument();
    });
  });
});
