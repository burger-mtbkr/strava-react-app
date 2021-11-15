import { render, screen } from '@testing-library/react';
import { mockStravaActivities } from 'src/test/utils';
import WeekTotals from './WeekTotals';

describe(`${WeekTotals.name} tests`, () => {
  describe('when strava is connected', () => {
    beforeEach(() => {
      render(<WeekTotals {...mockStravaActivities} />);
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
