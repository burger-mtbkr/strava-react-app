import { render, screen } from '@testing-library/react';
import Connect from './Connect';

describe(`${Connect.name} tests`, () => {
  beforeEach(() => {
    render(<Connect />);
  });

  it(`should render the total time`, () => {
    const time = screen.getByText('Connect to Strava');
    expect(time).toBeInTheDocument();
  });
});
