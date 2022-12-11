import { render, screen } from '@testing-library/react';
import { TestIds } from 'src/test/utils';
import Skeleton from './Skeleton';

describe(`${Skeleton.name} tests`, () => {
  it(`should render the ${Skeleton.name} component`, () => {
    render(<Skeleton />);
    const skeletonComponent = screen.getByTestId(TestIds.skeletonComponent);
    expect(skeletonComponent).toBeInTheDocument();
  });
});
