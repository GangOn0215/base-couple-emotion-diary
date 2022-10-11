import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import loginFetchReducer from './auth/fetch/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  fetchAuth: loginFetchReducer,
});

export default rootReducer;
