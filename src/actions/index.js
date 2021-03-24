import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_RECIPE,
  FETCH_RECIPES,
  FETCH_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
} from './types';

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
