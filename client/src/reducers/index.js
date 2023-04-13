import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';
import subjectReducer from './subjectReducer';
import studentReducer from './studentReducer';
import categoryReducer from './categoryReducer';
import questionReducer from './questionReducer';
import answerReducer from './answerReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
  subjects: subjectReducer,
  students: studentReducer,
  categories: categoryReducer,
  questions: questionReducer,
  answers: answerReducer
});
