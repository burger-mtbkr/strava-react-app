import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const LoadingSkeleton = () => (
  <Stack spacing={1}>
    <Skeleton height="80px" width="100%" />
    <Skeleton height="50px" width="100%" variant="rectangular" />
    <Skeleton height="80px" width="100%" />
    <Skeleton height="50px" width="100%" variant="rectangular" />
    <Skeleton height="80px" width="100%" />
    <Skeleton height="50px" width="100%" variant="rectangular" />
    <Skeleton height="80px" width="100%" />
  </Stack>
);
export default LoadingSkeleton;
