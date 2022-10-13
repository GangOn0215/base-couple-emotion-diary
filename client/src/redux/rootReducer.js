import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import axiosLoginReducer from './auth/axios/login/reducer';
import axiosRegisterReducer from './auth/axios/register/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  axiosLogin: axiosLoginReducer,
  axiosRegister: axiosRegisterReducer,
});

export default rootReducer;
