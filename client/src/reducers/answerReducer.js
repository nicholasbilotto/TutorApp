import _ from 'lodash';
import {
  SUBMIT_ANSWER,
  FETCH_ANSWERS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ANSWERS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    // case FETCH_QUESTION:
    //   return { ...state, [action.payload.id]: action.payload };
    case SUBMIT_ANSWER:
      return { ...state, [action.payload.id]: action.payload };
    // case EDIT_QUESTION:
    //   return { ...state, [action.payload.id]: action.payload };
    // case DELETE_QUESTION:
    //   return _.omit(state, action.payload);
    default:
      return state;
  }
};
