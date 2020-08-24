import React, {
    useState,
    useEffect,
    useCallback
  } from 'react';
  import { connect } from "react-redux";
  import { shallowEqual, useSelector } from 'react-redux';
  import {
    Box,
    Container,
    makeStyles
  } from '@material-ui/core';
  import axios from 'src/utils/axios';
  import Page from 'src/components/Page';
  import useIsMountedRef from 'src/hooks/useIsMountedRef';
  import Header from './Header';
  import { getPendingAccounts,updateUserAccount } from 'src/actions/accountActions';
import Results from './Results';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  }));
  
  function PendingAccountApprovalView({getPendingAccounts,updateAccount}) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
  
    const  pendingAccounts  = useSelector(state => ({
        data: state.account.pendingAccounts,
      }), shallowEqual);

    const getAccounts = useCallback(() => {
        getPendingAccounts()
    },[isMountedRef])

    useEffect(() => {
      getAccounts();
    }, [getAccounts]);
  
    const updateStatusHandler=async(data)=>{
        await updateAccount(data)
        await getPendingAccounts()
    }
    return (
      <Page
        className={classes.root}
        title="Customer List"
      >
        <Container maxWidth={false}>
          <Header />
           {pendingAccounts && pendingAccounts.data && pendingAccounts.data.length > 0 && ( 
             <Box mt={3}>
               <Results accounts={pendingAccounts.data}
               updateStatus={updateStatusHandler}
               />
             </Box>
           )}
        </Container>
      </Page>
    );
  }

  const mapDispatchToProps = dispatch => ({
    getPendingAccounts: () => dispatch(getPendingAccounts()),
    updateAccount: (data) => dispatch(updateUserAccount(data)),

    
  });
  
  export default connect(null,mapDispatchToProps)(PendingAccountApprovalView);
  
  