import { render, screen } from '@testing-library/react';
import { mockStravaActivities } from 'src/test/utils';
import ActivityListTotals from './ActivityListTotals';

describe(`${ActivityListTotals.name} tests`, () => {
  describe('when strava is connected', () => {
    beforeEach(() => {
      render(<ActivityListTotals {...mockStravaActivities} />);
    });

    it(`should render the total time`, () => {
      const time = screen.getByText('4h 16m');
      expect(time).toBeInTheDocument();
    });

    it(`should render the total distance`, () => {
      const distance = screen.getByText('146.24 km');
      expect(distance).toBeInTheDocument();
    });

    it(`should render the total elevation`, () => {
      const elevation = screen.getByText('759 m');
      expect(elevation).toBeInTheDocument();
    });
  });
});
