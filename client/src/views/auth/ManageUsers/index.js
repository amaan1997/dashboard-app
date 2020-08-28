import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, Container, makeStyles } from '@material-ui/core';
import { get } from 'lodash';
import Page from 'src/components/Page';
import Header from './Header';
import {
  getPendingAccounts,
  updateUserAccount,
  deactivateUser
} from 'src/actions/accountActions';
import axios from 'src/utils/axios'
import { getAllUsers } from 'src/actions/accountActions';
import {API_URL} from 'src/actionTypes'
import Results from './Results';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function ManageUsers({ deactivateUserRes }) {
  const classes = useStyles();

  const user = useSelector(state => state.account.user);
  const userList = useSelector(state => state.account.userList);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  let userInfo = {};
  if (user && Object.keys(user).length > 0) {
    userInfo = get(user, 'data', {});
  }

  const deactivateUserHandler =  (userEmail) => {
    const data = {
      email: userEmail,
      role: userInfo.role ? userInfo.role : ''
    };
      axios.post(`${API_URL}/auth/deactivate-user`,data)
      .then(()=>{
        enqueueSnackbar('User Status Updated Successfully!', {
            variant: 'success'
        });
        dispatch(getAllUsers({role:userInfo.role}));
      })
      .catch(err=>{
        const error = err.response.data.data
          ? deactivateUserRes.data
          : 'Unable to deactivate the user!';
        enqueueSnackbar(error, {
          variant: 'error'
        });
      })
  };
  const updateUserBlockStatusHandler=(email,blockStatus,blockReason)=>{
    console.log("data>>>",email+ '...'+blockReason)
    const data={
      role:userInfo.role ? userInfo.role : '',
      email:email,
      blockStatus:blockStatus,
      blockReason:blockReason
    }
    axios.post(`${API_URL}/auth/block-user`,data)
      .then(()=>{
        enqueueSnackbar('User Deactivated Successfully!', {
            variant: 'success'
        });
        dispatch(getAllUsers({role:userInfo.role}));
      })
      .catch(err=>{
        const error = err.response.data.data
          ? deactivateUserRes.data
          : 'Unable to block/unblock the user!';
        enqueueSnackbar(error, {
          variant: 'error'
        });
      })
  }
  useEffect(() => {
    const data = {
      role: userInfo.role ? userInfo.role : ''
    };
    dispatch(getAllUsers(data));
  }, []);

  console.log('userList', userList);
  return (
    <Page className={classes.root} title="Customer List">
      <Container maxWidth={false}>
        <Header />
        {userList && userList.data && userList.data.length > 0 && (
          <Box mt={3}>
            <Results
              userList={userList.data}
              deactivateUser={deactivateUserHandler}
              updateUserBlockStatus={updateUserBlockStatusHandler}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
}
const mapStateToProps = state => {
  return {
    deactivateUserRes: state.account.deactivateUserRes
  };
};

const mapDispatchToProps = dispatch => ({
  getPendingAccounts: () => dispatch(getPendingAccounts()),
  updateAccount: data => dispatch(updateUserAccount(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
