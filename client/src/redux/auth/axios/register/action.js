import axios from 'axios';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_NETWORK_ERROR,
} from './types';

const axiosRegisterRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

const axiosRegisterSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
};

const axiosRegisterFailure = (data) => {
  return {
    type: REGISTER_FAILURE,
    payload: data.data.error,
  };
};

const axiosNetworkError = (error) => {
  return {
    type: REGISTER_NETWORK_ERROR,
    payload: error,
  };
};

export const axiosRegisterAction = (id, pw, email, phoneNumber, age) => {
  let getActionUrl = window.location.origin;

  if (process.env.NODE_ENV === 'development') {
    getActionUrl = 'http://localhost:3001';
  }

  return (dispatch) => {
    dispatch(axiosRegisterRequest());
    axios
      .post(`${getActionUrl}/account/register`, {
        id,
        pw,
        email,
        phoneNumber,
        age,
      })
      .then((data) => {
        switch (data.data.status) {
          case 'register_success':
            dispatch(axiosRegisterSuccess(data));
            break;
          case 'register_fail':
            dispatch(axiosRegisterFailure(data));
            break;
          default:
            break;
        }
      })
      .catch((error) => dispatch(axiosNetworkError(error)));
  };
};
