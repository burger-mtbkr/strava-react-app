import { setHeaderTitleAction } from 'src/actions';
import reducer, { appInitialState } from 'src/reducers/app.reducer';

describe(`[reducers] app reducer`, () => {
  it(`reduces ${setHeaderTitleAction.name} correctly`, () => {
    const state = reducer(appInitialState, setHeaderTitleAction('New header'));
    expect(state.title).toEqual('New header');
  });
});
