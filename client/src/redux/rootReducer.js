import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import axiosLoginReducer from './auth/axios/login/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  axiosLogin: axiosLoginReducer,
});

export default rootReducer;
