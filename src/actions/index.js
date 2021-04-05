import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_RECIPE,
  FETCH_RECIPES,
  FETCH_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
} from './types';
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
export const createRecipe = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await recipes.post('/recipes', { ...formValues, userId });

  dispatch({ type: CREATE_RECIPE, payload: response.data });

  return response;
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

export const editRecipe = (id) => async (dispatch) => {
  const response = await recipes.patch(`streams/${id}`);

  dispatch({ type: EDIT_RECIPE, payload: response.data });

  return response;
};

export const deleteRecipe = (id) => async (dispatch) => {
  const response = await recipes.delete(`recipes/${id}`);

  dispatch({ type: DELETE_RECIPE, payload: id });

  return response;
};
