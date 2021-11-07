import { createAction } from '@reduxjs/toolkit';

const APP_PREFIX = 'APP';

export const setHeaderTitleAction = createAction<string>(
  `APP_${APP_PREFIX}_SET_HEADER_TITLE`,
);
