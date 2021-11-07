import { screen } from '@testing-library/react';
import Home from 'src/views/Home/Home';
import { rootInitialState } from 'src/reducers';
import Header from 'src/components/Header/Header';
import App from 'src/App';
import { TestIds } from 'src/utils';
import { renderWithRedux } from 'src/test/utils';

describe(`${Header.name} tests`, () => {
  test('renders App Header', () => {
    renderWithRedux(<App />, {
      initialState: rootInitialState,
    });
    const linkElement = screen.getByTestId(TestIds.headerAppBarTestId);
    expect(linkElement).toBeInTheDocument();
  });

  test(`renders the ${Home.name} view`, () => {
    renderWithRedux(<App />, {
      initialState: rootInitialState,
    });
    const linkElement = screen.getByTestId(TestIds.homeViewComponent);
    expect(linkElement).toBeInTheDocument();
  });
});
