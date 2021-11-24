export const TestIds = {
  headerAppBarTestId: 'COMPONENTS_HEADER_HEADER_APP_BAR',
  homeViewComponent: 'VIEWS_HOME_COMPONENT',
  skeletonComponent: 'COMPONENTS_STRAVA_SKELETON',
  activityItemComponent: (activityId: number) =>
    `COMPONENTS_STRAVA_ACTIVITY_ITEM_${activityId}`,
};
