import axios from 'axios';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_NETWORK_ERROR, LOGOUT } from './types';

const axiosLoginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const axiosLoginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

const axiosLoginFailure = (data) => {
  return {
    type: LOGIN_FAILURE,
    payload: data.data.error,
  };
};

const axiosNetworkError = (error) => {
  return {
    type: LOGIN_NETWORK_ERROR,
    payload: error,
  };
};

export const axiosLoginAction = (loginID, loginPW) => {
  let getActionUrl = window.location.origin;

  if (process.env.NODE_ENV === 'development') {
    getActionUrl = 'http://localhost:3001';
  }

  return (dispatch) => {
    dispatch(axiosLoginRequest());
    axios
      .post(`${getActionUrl}/account/login`, {
        id: loginID,
        pw: loginPW,
      })
      .then((data) => {
        switch (data.data.status) {
          case 'login_success':
            dispatch(axiosLoginSuccess(data));
            break;
          case 'login_fail':
            dispatch(axiosLoginFailure(data));
            break;
          default:
            break;
        }
      })
      .catch((error) => dispatch(axiosNetworkError(error)));
  };
};

export const actionLogout = () => {
  return {
    type: LOGOUT,
  };
};
