import { LOGIN, LOGOUT } from './types';

export const isAuthLoginAction = (memberId) => {
  const payload = {
    memberId,
  };
  return {
    type: LOGIN,
    payload: payload,
  };
};

export const isAuthLogoutAction = () => {
  return {
    type: LOGOUT,
  };
};
