import { screen } from '@testing-library/react';
import StravaActivityList from 'src/views/StravaActivityList';
import { rootInitialState } from 'src/reducers';
import Header from 'src/components/Header/Header';
import App from 'src/App';

import { renderWithRedux, TestIds } from 'src/test/utils';

describe(`${Header.name} tests`, () => {
  test('renders App Header', () => {
    renderWithRedux(<App />, {
      initialState: rootInitialState,
    });
    const linkElement = screen.getByTestId(TestIds.headerAppBarTestId);
    expect(linkElement).toBeInTheDocument();
  });

  test(`renders the ${StravaActivityList.name} view`, () => {
    renderWithRedux(<App />, {
      initialState: rootInitialState,
    });
    const linkElement = screen.getByTestId(TestIds.stravaListComponent);
    expect(linkElement).toBeInTheDocument();
  });
});
