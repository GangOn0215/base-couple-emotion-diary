import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; // 추가
import storageSession from 'redux-persist/lib/storage/session';

import authReducer from './auth/reducer';
import axiosLoginReducer from './auth/axios/login/reducer';
import axiosRegisterReducer from './auth/axios/register/reducer';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth'],
}; // 추가

const rootReducer = combineReducers({
  auth: authReducer,
  axiosLogin: axiosLoginReducer,
  axiosRegister: axiosRegisterReducer,
});

// export default rootReducer;

const persistedReducer = persistReducer(persistConfig, rootReducer); // 추가

export default persistedReducer; // 수정
