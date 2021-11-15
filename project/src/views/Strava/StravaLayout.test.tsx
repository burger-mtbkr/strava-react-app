import { screen } from '@testing-library/react';
import { mockStoreState, renderWithRedux } from 'src/test/utils';
import StravaLayout from './StravaLayout';

describe(`${StravaLayout.name} tests`, () => {
  describe('when strava is connected', () => {
    beforeEach(() => {
      renderWithRedux(<StravaLayout />, {
        initialState: mockStoreState,
      });
    });

    it(`should render the Current week Activities list`, () => {
      const activitiesHeading = screen.getByText('Latest Activities');
      expect(activitiesHeading).toBeInTheDocument();
    });

    it(`should render the Recent Stats`, () => {
      const activitiesHeading = screen.getByText('Recent Stats');
      expect(activitiesHeading).toBeInTheDocument();
    });

    it(`should render the CAll-time Stats`, () => {
      const activitiesHeading = screen.getByText('All-time Stats');
      expect(activitiesHeading).toBeInTheDocument();
    });

    it(`should display the first activity in the list`, () => {
      const activityOneName = screen.getByText('Watopia');
      expect(activityOneName).toBeInTheDocument();
    });

    it(`should display the second activity in the list`, () => {
      const activityTwoName = screen.getByText(
        'Ascenders Team Singapore Zwift Ride',
      );
      expect(activityTwoName).toBeInTheDocument();
    });

    it(`should display the third activity in the list`, () => {
      const activityOneName = screen.getByText('Afternoon Ride');
      expect(activityOneName).toBeInTheDocument();
    });
  });
});
