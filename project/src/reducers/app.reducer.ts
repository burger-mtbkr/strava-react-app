import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppState } from 'src/models/app.model';

export const appInitialState: IAppState = {
  title: 'Strava React App',
};

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setHeaderTitleAction: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
    },
  },
});

export const { setHeaderTitleAction } = appSlice.actions;

export default appSlice.reducer;
