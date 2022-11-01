import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_NETWORK_ERROR, LOGOUT } from './types';

const initialState = {
  isLoading: false,
  status: 'LOGIN_FAIL',
  error: '',
};

const axiosLoginReducer = (currentState = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOGIN_REQUEST:
      newState = {
        ...currentState,
        isLoading: true,
        error: '',
      };
      break;
    case LOGIN_SUCCESS:
      newState = {
        ...currentState,
        isLoading: false,
        status: 'LOGIN_SUCCESS',
        token: action.payload.data.token,
        memberId: action.payload.data.member.id,
        // memberInfo: action.payload,
      };
      break;
    case LOGIN_FAILURE:
      newState = {
        ...currentState,
        isLoading: false,
        status: 'LOGIN_FAIL',
        token: '',
        error: action.payload,
      };
      break;
    case LOGIN_NETWORK_ERROR:
      newState = {
        ...currentState,
        error: 'NETWORK_ERROR',
        status: 'NETWORK_ERROR',
        token: '',
      };
      break;
    case LOGOUT:
      newState = {
        ...currentState,
        isLoading: false,
        status: 'LOGIN_FAIL',
        token: '',
      };
      break;
    default:
      newState = currentState;
      break;
  }

  return newState;
};

export default axiosLoginReducer;
