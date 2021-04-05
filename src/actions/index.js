import { SIGN_IN, SIGN_OUT, FETCH_RECIPES, FETCH_RECIPE } from './types';
import recipes from '../apis/recipes';

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

export const fetchRecipes = () => async (dispatch) => {
  const response = await recipes.get('/recipes');

  dispatch({ type: FETCH_RECIPES, payload: response.data });

  return response;
};

export const fetchRecipe = (id) => async (dispatch) => {
  const response = await recipes.get(`/recipes/${id}`);

  dispatch({ type: FETCH_RECIPE, payload: response.data });
};
