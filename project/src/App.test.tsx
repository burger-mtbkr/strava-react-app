import { screen } from '@testing-library/react';
import { rootInitialState } from 'src/reducers';
import Header from 'src/components/Header/Header';
import App from 'src/App';
import { renderWithRedux, TestIds } from './test/utils';

describe(`${Header.name} tests`, () => {
  test('renders App Header', () => {
    renderWithRedux(<App />, {
      initialState: rootInitialState,
    });
    const linkElement = screen.getByTestId(TestIds.headerAppBarTestId);
    expect(linkElement).toBeInTheDocument();
  });
});
