/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from '@testing-library/react';
import { mockSummaryActivities } from 'src/test/utils';
import ActivityListTotals from './ActivityListTotals';

describe(`${ActivityListTotals.name} tests`, () => {
  describe('when strava is connected', () => {
    beforeEach(() => {
      render(<ActivityListTotals {...mockSummaryActivities} />);
    });

    it(`should render the total time`, () => {
      const time = screen.getByText('5h 13m');
      expect(time).toBeInTheDocument();
    });

    it(`should render the total distance`, () => {
      const distance = screen.getByText('145.58 km');
      expect(distance).toBeInTheDocument();
    });

    it(`should render the total elevation`, () => {
      const elevation = screen.getByText('2020.7 m');
      expect(elevation).toBeInTheDocument();
    });
  });
});
