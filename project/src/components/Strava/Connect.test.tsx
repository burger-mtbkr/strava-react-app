import { render, screen } from '@testing-library/react';
import Connect from './Connect';

describe(`${Connect.name} tests`, () => {
  it(`should render the total time`, () => {
    render(<Connect />);
    const time = screen.getByText('Connect with Strava');
    expect(time).toBeInTheDocument();
  });
});
