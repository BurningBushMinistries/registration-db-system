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
import CHURCHLIST from '../_api_/church';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'Church Name', alignRight: false },
  { id: 'branch', label: 'Branch', alignRight: false },
  { id: 'province', label: 'Province', alignRight: false },
  { id: 'city', label: 'City', alignRight: false },
  { id: 'region', label: 'Region', alignRight: false },
  { id: 'pastor', label: 'Pastor', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },  
  // { id: 'ministry', label: 'Ministry', alignRight: false },
  // { id: 'cellLeader', label: 'Cell Leader', alignRight: false },
  // { id: 'cellLocation', label: 'Cell Location', alignRight: false },
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

class Church extends Component {

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
    this.handleChangeRowsPerPage
    this.render()
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
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
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

  emptyRows = (CHURCHLIST) =>
    this.state.page > 0
      ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - CHURCHLIST?.length)
      : 0;

  filteredUsers = (CHURCHLIST) =>
    applySortFilter(
      CHURCHLIST,
      getComparator(this.state.order, this.state.orderBy),
      this.state.filterName
    );

  isUserNotFound = this.state?.filteredUsers?.length === 0;

  displayData = () => {
    console.log('Dude: => ', CHURCHLIST);
    this.setState({ ARRAY_TO_USE: CHURCHLIST });
    this.forceUpdate();
  };


  render() {
    const { page, order, selected, orderBy, filterName, rowsPerPage } = this.state;

    return (
      <Page title="Church | BBM">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Church Details
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/add-church"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Church
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
                    rowCount={CHURCHLIST?.length}
                    numSelected={selected?.length}
                    onRequestSort={this.handleRequestSort}
                    onSelectAllClick={this.handleSelectAllClick}
                  />

                  <TableBody>
                    {CHURCHLIST?.length>0 ? this.filteredUsers(CHURCHLIST)
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const {
                          id,
                          churchName,
                          branch,
                          province,
                          city,
                          region,
                          pastorId,
                          location
                        } = row;
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
                                  {churchName}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{branch}</TableCell>
                            <TableCell align="left">{province}</TableCell>
                            <TableCell align="left">{city}</TableCell>
                            <TableCell align="left">{region}</TableCell>
                            <TableCell align="left">{pastorId}</TableCell>
                            <TableCell align="left">{location}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      }): <div>No church record available...</div>} {console.log('Inside: => ', CHURCHLIST)}
                    {this.emptyRows(CHURCHLIST) > 0 && (
                      <TableRow style={{ height: 53 * this.emptyRows(CHURCHLIST) }}>
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
              count={CHURCHLIST?.length}
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

export default Church;
