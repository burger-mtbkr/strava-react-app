import { screen } from '@testing-library/react';
import { mockStoreState, renderWithRedux, TestIds } from 'src/test/utils';
import { rootInitialState } from 'src/reducers';
import StravaActivityList from './StravaActivityList';

describe(`${StravaActivityList.name} tests`, () => {
  describe('when strava is connected', () => {
    beforeEach(() => {
      renderWithRedux(<StravaActivityList />, {
        initialState: mockStoreState,
      });
    });

    it(`should renders the ${StravaActivityList.name} view`, () => {
      const activitiesHeading = screen.getByText('Latest Activities');
      expect(activitiesHeading).toBeInTheDocument();
    });

    it(`should render the Current week Activities list`, () => {
      const activitiesHeading = screen.getByText('Recent Activities');
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

  describe('when strava is not connected', () => {
    test(`renders the ${StravaActivityList.name} view`, () => {
      renderWithRedux(<StravaActivityList />, {
        initialState: rootInitialState,
      });

      const linkElement = screen.getByTestId(TestIds.stravaListComponent);
      expect(linkElement).toBeInTheDocument();
    });

    test(`renders the ${StravaActivityList.name} view`, () => {
      renderWithRedux(<StravaActivityList />, {
        initialState: rootInitialState,
      });

      const activitiesHeading = screen.getByText('Connect to Strava');
      expect(activitiesHeading).toBeInTheDocument();
    });
  });
});
