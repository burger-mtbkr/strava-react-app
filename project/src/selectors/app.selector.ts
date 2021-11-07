import { TStoreState } from 'src/reducers';

export const getHeaderTitle = (state: TStoreState): string => state.app.title;
