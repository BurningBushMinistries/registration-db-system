/* eslint-disable */

import React, { Component } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
//
import STATSLIST from '../_api_/stats';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'churchId', label: 'Church', alignRight: false },
  { id: 'adult', label: 'No. Adults', alignRight: false },
  { id: 'car', label: 'Cars', alignRight: false },
  { id: 'fk', label: 'Faith Kids', alignRight: false },
  { id: 'ck', label: 'Covenant Keepers', alignRight: false },
  { id: 'aow', label: 'Army Of Women', alignRight: false },
  { id: 'saved', label: 'Saved', alignRight: false },
  { id: 'offering', label: 'Offering', alignRight: false },
  { id: 'visitors', label: 'Visitors', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: '' }
];
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  if (array.length > 0) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }
  return array;
}

class StatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      order: 'asc',
      selected: [],
      orderBy: 'name',
      filterName: '',
      rowsPerPage: 10,
      page: 0
    };
    this.forceUpdate();
    this.displayData = this.displayData.bind(this);
    this.displayData();
  }

  componentDidUpdate() {
    this.handleChangeRowsPerPage;
    this.render();
  }

  alertName = () => {
    alert(this.state.name);
  };

  handleNameInput = (e) => {
    this.setState({ name: e.target.value });
  };

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({ order: isAsc ? 'desc' : 'asc' });
    this.setState({ orderBy: property });
  };

  handleSelectAllClick = (event) => {
    this.displayData();
    if (event.target.checked) {
      const newSelecteds = STATSLIST.map((n) => n.name);
      // setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  handleClick = (event, name) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleFilterByName = (event) => {
    this.setState({ filterName: event.target.value });
  };

  emptyRows = (STATSLIST) =>
    this.state.page > 0
      ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - STATSLIST?.length)
      : 0;

  filteredUsers = (STATSLIST) =>
    applySortFilter(
      STATSLIST,
      getComparator(this.state.order, this.state.orderBy),
      this.state.filterName
    );

  isUserNotFound = this.state?.filteredUsers?.length === 0;

  displayData = () => {
    console.log('Dude: => ', STATSLIST);
    this.setState({ ARRAY_TO_USE: STATSLIST });
    this.forceUpdate();
  };

  render() {
    const { page, order, selected, orderBy, filterName, rowsPerPage } = this.state;

    return (
      <Page title="Stats | BBM">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Stats Details
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/add-stats"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add New Stats
            </Button>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected?.length}
              filterName={filterName}
              onFilterName={this.handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={STATSLIST?.length}
                    numSelected={selected?.length}
                    onRequestSort={this.handleRequestSort}
                    onSelectAllClick={this.handleSelectAllClick}
                  />

                  <TableBody>
                    {STATSLIST?.length>0 ? this.filteredUsers(STATSLIST)
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { id, churchId, adult, car, fk, ck, aow, saved, offering, visitors, date } =
                          row;
                        const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => this.handleClick(event, name)}
                              />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none" key={id}>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {churchId}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{adult}</TableCell>
                            <TableCell align="left">{car}</TableCell>
                            <TableCell align="left">{fk}</TableCell>
                            <TableCell align="left">{ck}</TableCell>
                            <TableCell align="left">{aow}</TableCell>
                            <TableCell align="left">{saved}</TableCell>
                            <TableCell align="left">{offering}</TableCell>
                            <TableCell align="left">{visitors}</TableCell>
                            <TableCell align="left">{date.substring(0, 10)}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      }): <div>No stats record available...</div>}{' '}
                    {console.log('Inside: => ', STATSLIST)}
                    {this.emptyRows(STATSLIST) > 0 && (
                      <TableRow style={{ height: 53 * this.emptyRows(STATSLIST) }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {this.isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={STATSLIST?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    );
  }
}

export default StatsPage;
