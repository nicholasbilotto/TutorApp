import _ from 'lodash';
import {
  CREATE_STUDENT,
  FETCH_STUDENTS,
  DELETE_STUDENT,
  FETCH_STUDENT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STUDENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STUDENT:
      return { ...state, [action.payload.id]: action.payload };
    // case EDIT_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };
    case DELETE_STUDENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
