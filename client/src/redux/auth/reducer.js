import { LOGIN, LOGOUT } from './types';

const initialState = {
  isAuth: false,
  id: null,
};

const accountReducer = (currentState = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOGIN:
      console.log(action);
      newState = {
        isAuth: true,
        id: action.payload.memberId,
      };
      break;
    case LOGOUT:
      newState = {
        isAuth: false,
        id: null,
      };
      break;
    default:
      newState = currentState;
      break;
  }

  return newState;
};

export default accountReducer;
