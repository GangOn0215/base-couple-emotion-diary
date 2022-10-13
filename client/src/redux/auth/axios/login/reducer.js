import { REQUEST, SUCCESS, FAILURE, NETWORK_ERROR, LOGOUT } from '../types';

const initialState = {
  isLoading: false,
  status: 'LOGIN_FAIL',
};

const loginAxiosReducer = (currentState = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case REQUEST:
      newState = {
        ...currentState,
        isLoading: true,
      };
      break;
    case SUCCESS:
      console.log(action.payload.data.token);
      newState = {
        ...currentState,
        isLoading: false,
        status: 'LOGIN_SUCCESS',
        token: action.payload.data.token,
        // memberInfo: action.payload,
      };
      break;
    case FAILURE:
      newState = {
        ...currentState,
        isLoading: false,
        status: 'LOGIN_FAIL',
        token: '',

        // error: action.payload,
      };
      break;
    case NETWORK_ERROR:
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

export default loginAxiosReducer;
