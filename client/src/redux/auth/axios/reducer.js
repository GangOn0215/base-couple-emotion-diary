import {
  AXIOS_LOGIN_REQUEST,
  AXIOS_LOGIN_SUCCESS,
  AXIOS_LOGIN_FAILURE,
  AXIOS_NETWORK_ERROR,
  AXIOS_LOGIN_CHECK_REQUEST,
  AXIOS_LOGIN_CHECK_SUCCESS,
  AXIOS_CHECK_FAILURE,
  LOGOUT,
} from './types';

const initialState = {
  isAuth: false,
  isLoading: false,
  memberInfo: {},
};

const loginAxiosReducer = (currentState, action) => {
  let newState = {};
  switch (action.type) {
    case AXIOS_LOGIN_REQUEST:
      newState = {
        ...currentState,
        isLoading: true,
      };
      break;
    case AXIOS_LOGIN_SUCCESS:
      newState = {
        ...currentState,
        isLoading: false,
        isAuth: true,
        memberInfo: action.payload,
      };
      break;
    case AXIOS_LOGIN_FAILURE:
      newState = {
        ...currentState,
        isLoading: false,
        isAuth: false,
        error: action.payload,
      };
      break;
    case AXIOS_LOGIN_CHECK_REQUEST:
      break;
    case AXIOS_LOGIN_CHECK_SUCCESS:
      break;
    case AXIOS_CHECK_FAILURE:
      break;
    case AXIOS_NETWORK_ERROR:
      newState = {
        ...currentState,
        error: 'NETWORK_ERROR',
      };
      break;
    case LOGOUT:
    default:
      newState = initialState;
      break;
  }

  return newState;
};

export default loginAxiosReducer;
