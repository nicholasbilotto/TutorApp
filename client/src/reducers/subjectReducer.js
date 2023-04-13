import _ from 'lodash';
import {
  CREATE_SUBJECT,
  FETCH_SUBJECTS,
  DELETE_SUBJECT,
  FETCH_SUBJECT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUBJECTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_SUBJECT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_SUBJECT:
      return { ...state, [action.payload.id]: action.payload };
    // case EDIT_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };
    case DELETE_SUBJECT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
