import {
  FETCH_LOGIN,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
} from './types';

const initialState = {
  isAuth: false,
  memberInfo: {},
};

const loginFetchReducer = (currentState, action) => {
  let newState = {};
  switch (action.type) {
    default:
      newState = initialState;
      break;
  }

  return newState;
};

export default loginFetchReducer;
