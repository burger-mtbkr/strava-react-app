import { screen } from '@testing-library/react';
import { mockStoreState, renderWithRedux, TestIds } from 'src/test/utils';
import { rootInitialState } from 'src/reducers';
import StravaLayout from 'src/views/Strava/StravaLayout';
import Home from './Home';

describe(`${Home.name} tests`, () => {
  describe('when strava is not connected', () => {
    test(`renders the ${Home.name} view`, () => {
      renderWithRedux(<Home />, {
        initialState: rootInitialState,
      });

      const linkElement = screen.getByTestId(TestIds.homeViewComponent);
      expect(linkElement).toBeInTheDocument();
    });
    test(`renders the ${StravaLayout.name} view`, () => {
      renderWithRedux(<StravaLayout />, {
        initialState: rootInitialState,
      });

      const activitiesHeading = screen.getByText('Connect to Strava');
      expect(activitiesHeading).toBeInTheDocument();
    });
  });

  describe('when strava is connected', () => {
    test(`renders the ${StravaLayout.name} view`, () => {
      renderWithRedux(<StravaLayout />, {
        initialState: mockStoreState,
      });

      const activitiesHeading = screen.getByText('Latest Activities');
      expect(activitiesHeading).toBeInTheDocument();
    });
  });
});
