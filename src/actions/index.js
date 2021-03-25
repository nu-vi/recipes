import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = (userId, onSignOut) => {
  return {
    type: SIGN_IN,
    payload: { userId, onSignOut },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
