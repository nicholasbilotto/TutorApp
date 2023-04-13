import _ from 'lodash';
import {
  CREATE_QUESTION,
  FETCH_QUESTIONS,
  DELETE_QUESTION,
  FETCH_QUESTION,
  EDIT_QUESTION
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_QUESTION:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_QUESTION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_QUESTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_QUESTION:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
