import { screen } from '@testing-library/react';
import { TestIds } from 'src/utils';
import { renderWithRedux } from 'src/test/utils';
import { rootInitialState } from 'src/reducers';
import StravaInfo from 'src/views/Strava/StravaInfo';
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
    test(`renders the ${StravaInfo.name} view`, () => {
      renderWithRedux(<StravaInfo />, {
        initialState: rootInitialState,
      });

      const activitiesHeading = screen.getByText('Connect to Strava');
      expect(activitiesHeading).toBeInTheDocument();
    });
  });
});
