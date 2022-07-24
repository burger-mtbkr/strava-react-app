import { render, screen } from '@testing-library/react';
import { TestIds } from 'src/test/utils';
import Skeleton from './Skeleton';

describe(`${Skeleton.name} tests`, () => {
  beforeEach(() => {
    render(<Skeleton />);
  });

  it(`should render the ${Skeleton.name} component`, () => {
    const skeletonComponent = screen.getByTestId(TestIds.skeletonComponent);
    expect(skeletonComponent).toBeInTheDocument();
  });
});
