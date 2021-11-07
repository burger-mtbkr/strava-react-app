import { screen } from '@testing-library/react';
import { rootInitialState } from 'src/reducers';
import { renderWithRedux } from 'src/test/utils';
import { TestIds } from 'src/utils/testId.util';
import Header from './Header';

test(`renders ${Header.name}`, () => {
  renderWithRedux(<Header />, {
    initialState: rootInitialState,
  });
  const linkElement = screen.getByTestId(TestIds.headerAppBarTestId);
  expect(linkElement).toBeInTheDocument();
});
