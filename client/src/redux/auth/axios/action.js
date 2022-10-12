import axios from 'axios';

import {
  AXIOS_LOGIN_REQUEST,
  AXIOS_LOGIN_SUCCESS,
  AXIOS_LOGIN_FAILURE,
  LOGOUT,
  AXIOS_LOGIN_CHECK_REQUEST,
  AXIOS_LOGIN_CHECK_SUCCESS,
  AXIOS_CHECK_FAILURE,
  AXIOS_NETWORK_ERROR,
} from './types';

const axiosLoginRequest = () => {
  return {
    type: AXIOS_LOGIN_REQUEST,
  };
};

const axiosLoginSuccess = (data) => {
  return {
    type: AXIOS_LOGIN_SUCCESS,
    payload: data,
  };
};

const axiosLoginFailure = (data) => {
  console.log(data);
  return {
    type: AXIOS_LOGIN_FAILURE,
    payload: data.data.error,
  };
};

const axiosNetworkError = (error) => {
  return {
    type: AXIOS_NETWORK_ERROR,
    payload: error,
  };
};

export const axiosLogin = (loginID, loginPW) => {
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
        console.log(data);
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
