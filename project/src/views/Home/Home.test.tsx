import { screen } from '@testing-library/react';
import ProductTable from 'src/components/Products/ProductTable/ProductTable';
import { TestIds } from 'src/utils';
import { renderWithRedux } from 'src/test/utils';
import { rootInitialState } from 'src/reducers';
import Home from './Home';

describe(`${Home.name} tests`, () => {
  test(`renders the ${Home.name} view`, () => {
    renderWithRedux(<Home />, {
      initialState: rootInitialState,
    });
    const linkElement = screen.getByTestId(TestIds.homeViewComponent);
    expect(linkElement).toBeInTheDocument();
  });
  test(`renders the ${ProductTable.name} view`, () => {
    renderWithRedux(<ProductTable />, {
      initialState: rootInitialState,
    });

    const linkElement = screen.getByTestId(TestIds.productTable);
    expect(linkElement).toBeInTheDocument();
  });
});
