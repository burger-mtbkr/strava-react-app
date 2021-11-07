import { rootInitialState, TStoreState } from 'src/reducers';
import { getHeaderTitle } from './app.selector';

const state: TStoreState = {
  ...rootInitialState,
  app: {
    title: 'Hello world',
  },
};

describe(`[selectors] ${getHeaderTitle.name}`, () => {
  it(`should return the correct title for the app`, () => {
    expect(getHeaderTitle(state)).toEqual('Hello world');
  });
});
