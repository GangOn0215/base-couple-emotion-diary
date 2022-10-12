import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import loginAxiosReducer from './auth/axios/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  axiosAuth: loginAxiosReducer,
});

export default rootReducer;
