import axios from 'axios';

import {
  FETCH_LOGIN,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
} from './types';

export const fetchLogin = (loginID, loginPW) => {
  let getTodoUrl = window.location.origin;

  if (process.env.NODE_ENV === 'development') {
    getTodoUrl = 'http://localhost:3001';
  }

  return (dispatch) => {
    axios
      .post(`${getTodoUrl}/account/login`, {
        id: loginID,
        pw: loginPW,
      })
      .then((data) => console.log(data));
  };
};
