import axios from 'axios';
import authService from 'src/services/authService';
import * as actionTypes from '../actionTypes';

export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const UPDATE_PROFILE = '@account/update-profile';

export function login(data) {
  return dispatch => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
  };
  // return fetch('http://localhost:8000/api/v1/auth/login', requestOptions)
  return axios.get('http://localhost:8000/api/v1/auth/login')
      return axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/v1/auth/login',
        data: {
          firstName: 'Finn',
          lastName: 'Williams'
        }
      })
      // .then(res => {
      //   const accessToken=res.data.access_token
      //   localStorage.setItem("access_token", accessToken);
      //   axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      //   dispatch({
      //     type: actionTypes.LOGIN_SUCCESS,
      //     res
      //   });
      // })
      // .catch(error => {
      //   dispatch({
      //     type: actionTypes.LOGIN_FAILED,
      //     error
      //   });
      // });
  };
}

export function register(data) {
  return dispatch => {

    return axios.post("/api/v1/auth/register", data)
      .then(res => {
        const accessToken=res.data.access_token
        localStorage.setItem("access_token", accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          res
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.REGISTER_FAILED,
          error
        });
    });
  };
}

export function logout() {
  return async (dispatch) => {
    localStorage.removeItem("access_token");

    dispatch({
      type: actionTypes.LOGOUT_REQUEST
    });
  };
}
export function getPendingAccounts() {
  return dispatch => {
    return axios.get("/api/v1/auth/pending-accounts")
      .then(res => {
        dispatch({
          type: actionTypes.GET_PENDING_ACCOUNTS_SUCCESS,
          res
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.GET_PENDING_ACCOUNTS_FAILED,
          error
        });
    });
  };
}
export function updateUserAccount(data) {
  return dispatch => {
    return axios.post("/api/v1/auth/update-user-account",data)
      .then(res => {
        dispatch({
          type: actionTypes.UPDATE_USER_ACCOUNT_SUCCESS,
          res
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.UPDATE_USER_ACCOUNT_FAILED,
          error
        });
    });
  };
}
export function updateProfile(update) {
  const request = axios.post('/api/account/profile', { update });

  return (dispatch) => {
    request.then((response) => dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    }));
  };
}

export function setUserData(user) {
  return (dispatch) => dispatch({
    type: SILENT_LOGIN,
    payload: {
      user
    }
  });
}
