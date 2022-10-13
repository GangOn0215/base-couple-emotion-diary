import { LOGIN, LOGOUT } from './types';

export const isAuthLoginAction = () => {
  return {
    type: LOGIN,
  };
};

export const isAuthLogoutAction = () => {
  return {
    type: LOGOUT,
  };
};
