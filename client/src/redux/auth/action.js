import { LOGIN, LOGOUT } from './types';

export const actionLogin = () => {
  return {
    type: LOGIN,
  };
};

export const actionLogout = () => {
  return {
    type: LOGOUT,
  };
};
