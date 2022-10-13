import { LOGIN, LOGOUT } from './types';

const initialState = {
  isAuth: false,
};

const accountReducer = (currentState = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOGIN:
      newState = {
        isAuth: true,
      };
      break;
    case LOGOUT:
      newState = {
        isAuth: false,
      };
      break;
    default:
      newState = currentState;
      break;
  }

  return newState;
};

export default accountReducer;
