/* eslint-disable testing-library/no-render-in-setup */
import { screen } from '@testing-library/react';
import { mockStoreState, renderWithRedux } from 'src/test/utils';
import StatsSummary from './StatsSummary';

describe(`${StatsSummary.name} tests`, () => {
  describe('when strava is connected', () => {
    beforeEach(() => {
      renderWithRedux(<StatsSummary />, {
        initialState: mockStoreState,
      });
    });

    it(`should render the Recent Stats heading`, () => {
      const recentStatsHeading = screen.getByText('Recent Stats');
      expect(recentStatsHeading).toBeInTheDocument();
    });

    it(`should render the  All-time Stats heading`, () => {
      const allTimeStatsHeading = screen.getByText('All-time Stats');
      expect(allTimeStatsHeading).toBeInTheDocument();
    });
  });
});
