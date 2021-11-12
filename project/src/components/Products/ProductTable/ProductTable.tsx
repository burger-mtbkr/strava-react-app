import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { TestIds } from 'src/utils';
import { Order, ProductListItem } from 'src/models';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProducts, selectAllProducts } from 'src/sagas/selectors';
import { fetchAllProductsAction, setSelectedProductsAction } from 'src/actions';
import ProductTableToolbar from './ProductTableToolbar';
import ProductTableHead from './ProductTableHead';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof number | string>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const ProductTable = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductListItem>('name');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const data = useSelector(selectAllProducts);
  const selected = useSelector(getSelectedProducts);

  useEffect(() => {
    dispatch(setSelectedProductsAction([]));
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  const handleRequestSort = (property: keyof ProductListItem) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newlySelected = data?.map((n: ProductListItem) => n);
      if (newlySelected) {
        dispatch(setSelectedProductsAction(newlySelected));
      }
      return;
    }
    dispatch(setSelectedProductsAction([]));
  };

  const handleClick = (product: ProductListItem) => {
    const selectedIndex = selected.indexOf(product);
    let newSelected: ProductListItem[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    dispatch(setSelectedProductsAction(newSelected));
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (product: ProductListItem) =>
    selected.filter((p) => p.id === product.id).length > 0;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = () => {
    if (data && data?.length > 0) {
      return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    }
    return 0;
  };

  return (
    <Box sx={{ width: '100%' }} data-testid={TestIds.productTable}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ProductTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 600 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <ProductTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={(_e, property) => handleRequestSort(property)}
              rowCount={data?.length || 0}
            />
            <TableBody>
              {data
                ?.slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item: ProductListItem, index: number) => {
                  const isItemSelected = isSelected(item);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(item)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${item.id}_${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {item.id}
                      </TableCell>
                      <TableCell align="left">{item.name}</TableCell>
                      <TableCell align="left">{item.category}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows() > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows(),
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_e, n) => handleChangePage(n)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default ProductTable;
