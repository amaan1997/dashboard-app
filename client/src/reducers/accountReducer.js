/* eslint-disable no-param-reassign */
import produce from 'immer';
import * as actionTypes from '../actionTypes'

const initialState = {
  user: {},
  pendingAccounts:[],
  isUpdateAccount:false
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.LOGIN_REQUEST:{
      return produce(state, (draft) => {
        draft.user.data = {};
        draft.user.error=''
      });
    }

    case actionTypes.LOGIN_SUCCESS: {

      return produce(state, (draft) => {
        draft.user.data = action.res;
        draft.user.error=''
      });
    }

    case actionTypes.LOGIN_FAILED: {
      return produce(state, (draft) => {
        
        console.log("state>...amu",state)
        console.log("action>>",action.error)

        draft.user.data = {};
        draft.user.error=action.error
        
      });
    }

    case actionTypes.REGISTER_SUCCESS: {

      return produce(state, (draft) => {
        draft.user.data = action.res;
        draft.user.error=''
      });
    }

    case actionTypes.REGISTER_FAILED: {
      return produce(state, (draft) => {
        draft.user.data = {};
        draft.user.error=action.error
      });
    }

    case actionTypes.LOGOUT_REQUEST: {
      return produce(state, (draft) => {
        draft.user.data = {};
        draft.user.error=''
      });
    }

    case actionTypes.GET_PENDING_ACCOUNTS_SUCCESS:{
      return produce(state, (draft) => {
        draft.pendingAccounts = action.res;
      });
    }
    case actionTypes.GET_PENDING_ACCOUNTS_FAILED:{
      return produce(state, (draft) => {
        draft.pendingAccounts = [];
      });
    }
    
    case actionTypes.UPDATE_USER_ACCOUNT_SUCCESS:{
      return produce(state, (draft) => {
        draft.isUpdateAccount = true;
      });
    }

    case actionTypes.UPDATE_USER_ACCOUNT_FAILED:{
      return produce(state, (draft) => {
        draft.isUpdateAccount = false;
      });
    }

    case actionTypes.GET_ALL_USERS_SUCCESS:{
      return produce(state, (draft) => {
        draft.userList = action.res;
      });
    }

    case actionTypes.GET_ALL_USERS_FAILED:{
      return produce(state, (draft) => {
        draft.userList = [];
      });
    }

    case actionTypes.DEACTIVATE_USER_SUCCESS:{
      return produce(state, (draft) => {
        draft.deactivateUserRes = action.res;
      });
    }
    case actionTypes.DEACTIVATE_USER_FAILED:{
      return produce(state, (draft) => {
        draft.deactivateUserRes = action.error;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
