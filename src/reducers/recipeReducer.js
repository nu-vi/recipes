import _ from 'lodash';
import {
  CREATE_RECIPE,
  FETCH_RECIPES,
  FETCH_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_RECIPES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_RECIPE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
