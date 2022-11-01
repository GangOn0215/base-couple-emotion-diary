import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_NETWORK_ERROR,
} from './types';

const initialState = {
  isLoading: false,
  status: '',
};

const axiosRegisterReducer = (currentState = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case REGISTER_REQUEST:
      newState = {
        ...currentState,
        isLoading: true,
        error: '',
      };
      break;
    case REGISTER_SUCCESS:
      console.log(action.payload);
      newState = {
        ...currentState,
        isLoading: false,
        status: 'REGISTER_SUCCESS',
        token: action.payload.data.token,
        memberId: action.payload.data.memberId,
        error: '',
      };
      break;
    case REGISTER_FAILURE:
      newState = {
        ...currentState,
        isLoading: false,
        status: 'REGISTER_FAIL',
        token: '',
        error: action.payload,
      };
      break;
    case REGISTER_NETWORK_ERROR:
      newState = {
        ...currentState,
        error: 'NETWORK_ERROR',
        status: 'NETWORK_ERROR',
        token: '',
      };
      break;
    default:
      newState = currentState;
      break;
  }

  return newState;
};

export default axiosRegisterReducer;
