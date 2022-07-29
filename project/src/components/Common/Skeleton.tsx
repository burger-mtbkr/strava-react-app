import Skeleton from '@mui/material/Skeleton';
import { TestIds } from 'src/test/utils';

const LoadingSkeleton = () => (
  <div data-testid={TestIds.skeletonComponent}>
    <Skeleton height="80px" width="100%" />
    <Skeleton height="10px" width="100%" />
    <Skeleton height="80px" width="100%" />
    <Skeleton height="10px" width="100%" />
    <Skeleton height="80px" width="100%" />
  </div>
);

export default LoadingSkeleton;
