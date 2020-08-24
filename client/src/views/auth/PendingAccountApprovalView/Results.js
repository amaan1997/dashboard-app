/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {connect} from 'react-redux'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import {userRoles} from 'src/utils/data'


const tabs = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'acceptsMarketing',
    label: 'Accepts Marketing'
  },
  {
    value: 'isProspect',
    label: 'Prospect'
  },
  {
    value: 'isReturning',
    label: 'Returning'
  }
];

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)'
  },
  {
    value: 'orders|desc',
    label: 'Total orders (high to low)'
  },
  {
    value: 'orders|asc',
    label: 'Total orders (low to high)'
  }
];

function applyFilters(customers, query, filters) {
  return customers.filter(customer => {
    let matches = true;

    if (query) {
      const properties = ['email', 'name'];
      let containsQuery = false;

      properties.forEach(property => {
        if (customer[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach(key => {
      const value = filters[key];

      if (value && customer[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
}

function applyPagination(customers, page, limit) {
  return customers.slice(page * limit, page * limit + limit);
}

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

function applySort(customers, sort) {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // eslint-disable-next-line no-shadow
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

const useStyles = makeStyles(theme => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  approveBtn:{
    marginRight:theme.spacing(1)
  }
}));

function Results({ className, accounts,updateStatus,user, ...rest }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    isProspect: null,
    isReturning: null,
    acceptsMarketing: null
  });
  console.log('accounts>2>', accounts);

  // const handleTabsChange = (event, value) => {
  //   const updatedFilters = {
  //     ...filters,
  //     isProspect: null,
  //     isReturning: null,
  //     acceptsMarketing: null
  //   };

  //   if (value !== 'all') {
  //     updatedFilters[value] = true;
  //   }

  //   setFilters(updatedFilters);
  //   setSelectedCustomers([]);
  //   setCurrentTab(value);
  // };

  // const handleQueryChange = (event) => {
  //   event.persist();
  //   setQuery(event.target.value);
  // };

  // const handleSortChange = (event) => {
  //   event.persist();
  //   setSort(event.target.value);
  // };

  // const handleSelectAllCustomers = (event) => {
  //   setSelectedCustomers(event.target.checked
  //     ? customers.map((customer) => customer.id)
  //     : []);
  // };

  // const handleSelectOneCustomer = (event, customerId) => {
  //   if (!selectedCustomers.includes(customerId)) {
  //     setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
  //   } else {
  //     setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== customerId));
  //   }
  // };

  const updateUserStatus=(email,status)=>{
    const data={
      email:email,
      status:status==='approve' ?true:false,
      verifiedBy:'ilia.svinin@gmail.com'
    }
    updateStatus(data)

  }
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  console.log("userRoles",userRoles)
  // // Usually query is done on backend with indexing solutions
  // const filteredCustomers = applyFilters(customers, query, filters);
  // const sortedCustomers = applySort(filteredCustomers, sort);
  // const paginatedCustomers = applyPagination(sortedCustomers, page, limit);
  // const enableBulkOperations = selectedCustomers.length > 0;
  // const selectedSomeCustomers = selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  // const selectedAllCustomers = selectedCustomers.length === customers.length;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account, index) => {
                return (
                  <TableRow
                    hover
                    key={index + 1}
                    // selected={isCustomerSelected}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2" color="textSecondary">
                          {account.first_name + ' ' + account.last_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>{userRoles.map(role=>(
                      role.value===account.role && role.label
                    ))}</TableCell>

                    <TableCell align="right">
                      <Button
                        color="secondary"
                        size="small"
                        type="submit"
                        variant="contained"
                        className={classes.approveBtn}
                        onClick={()=>updateUserStatus(account.email,'approve')}
                      > 
                        Approve
                      </Button>
                      <Button
                        size="small"
                        type="submit"
                        onClick={()=>updateUserStatus(account.email,'reject')}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination
        component="div"
        // count={filteredCustomers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
  updateStatus:PropTypes.func.isRequired
};

Results.defaultProps = {
  customers: []
};

export default (Results);
