import { LOGIN, LOGOUT } from './types';

const initialState = {
  isAuth: false,
  memberInfo: {},
};

const accountReducer = (currentState = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOGIN:
      newState = {
        ...currentState,
        isAuth: true,
        memberInfo: {
          id: 'dmsqlctnekf',
          email: 'dmsqlctnekf@gmail.com',
        },
      };
      break;
    case LOGOUT:
      newState = initialState;
      break;
    default:
      newState = initialState;
      break;
  }

  return newState;
};

export default accountReducer;
