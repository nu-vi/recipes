import _ from 'lodash';
import { FETCH_RECIPES, FETCH_RECIPE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
