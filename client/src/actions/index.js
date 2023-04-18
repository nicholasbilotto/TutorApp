import streams from '../apis/streams';
import students from '../apis/students'
import subjects from '../apis/subjects';
import categories from '../apis/categories';
import questions from '../apis/questions';
import answers from '../apis/answers';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  CREATE_STUDENT,
  CREATE_SUBJECT,
  FETCH_SUBJECTS,
  FETCH_STUDENTS, 
  DELETE_SUBJECT,
  DELETE_STUDENT,
  FETCH_SUBJECT,
  FETCH_STUDENT,
  CREATE_CATEGORY, 
  FETCH_CATEGORIES,
  DELETE_CATEGORY,
  CREATE_QUESTION,
  FETCH_QUESTION,
  FETCH_QUESTIONS,
  DELETE_QUESTION,
  EDIT_QUESTION,
  EDIT_CATEGORY,
  SUBMIT_ANSWER,
  FETCH_ANSWERS
} from './types';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.go(-1);
};











export const createStudent = formValues => async (dispatch, getState) => {
  const response = await students.post('/students', { ...formValues });

  dispatch({ type: CREATE_STUDENT, payload: response.data });
};

export const fetchStudents = () => async dispatch => {
  const response = await students.get('/students');

  dispatch({ type: FETCH_STUDENTS, payload: response.data });
};

export const fetchStudent = id => async dispatch => {
  const response = await students.get(`/students/${id}`);

  dispatch({ type: FETCH_STUDENT, payload: response.data });
};

export const deleteStudent = id => async dispatch => {
  await students.delete(`/students/${id}`);

  dispatch({ type: DELETE_STUDENT, payload: id });
  history.go(-1);
};








export const createCategory = (formValues, subject) => async (dispatch, getState) => {
  const response = await categories.post('/categories', { ...formValues, subject });

  dispatch({ type: CREATE_CATEGORY, payload: response.data });
};

export const fetchCategories = (subject) => async dispatch => {
  const response = await categories.get('/categories');

  dispatch({ type: FETCH_CATEGORIES, payload: response.data });
};

export const deleteCategory = id => async dispatch => {
  await categories.delete(`/categories/${id}`);

  dispatch({ type: DELETE_CATEGORY, payload: id });
  history.go(-1);
};

export const editCategory = (id, formValues) => async dispatch => {
  const response = await categories.patch(`/categories/${id}`, formValues);

  dispatch({ type: EDIT_CATEGORY, payload: response.data });
};







export const createSubject = formValues => async (dispatch, getState) => {
  const response = await subjects.post('/subjects', { ...formValues });

  dispatch({ type: CREATE_SUBJECT, payload: response.data });
};


export const fetchSubjects = () => async dispatch => {
  const response = await subjects.get('/subjects');

  dispatch({ type: FETCH_SUBJECTS, payload: response.data });
};


export const fetchSubject = id => async dispatch => {
  const response = await subjects.get(`/subjects/${id}`);

  dispatch({ type: FETCH_SUBJECT, payload: response.data });
};


export const deleteSubject = id => async dispatch => {
  await subjects.delete(`/subjects/${id}`);

  dispatch({ type: DELETE_SUBJECT, payload: id });
  history.go(-1);
};






export const createQuestion = (formValues, subject) => async (dispatch, getState) => {
  console.log('Form values in action creator:', formValues);
  const response = await questions.post('/questions', { ...formValues, subject });

  dispatch({ type: CREATE_QUESTION, payload: response.data });
};


export const fetchQuestions = () => async dispatch => {
  const response = await questions.get('/questions');

  dispatch({ type: FETCH_QUESTIONS, payload: response.data });
};


export const fetchQuestion = id => async dispatch => {
  const response = await questions.get(`/questions/${id}`);

  dispatch({ type: FETCH_QUESTION, payload: response.data });
};


export const deleteQuestion = id => async dispatch => {
  await questions.delete(`/questions/${id}`);

  dispatch({ type: DELETE_QUESTION, payload: id });
  history.go(-1);
};

export const editQuestion = (id, formValues, subject) => async dispatch => {
  const response = await questions.patch(`/questions/${id}`, formValues);

  dispatch({ type: EDIT_QUESTION, payload: response.data });
};




export const submitAnswer = (formValues, question) => async (dispatch, getState) => {
  const response = await answers.post('/answers', { ...formValues, question });

  dispatch({ type: SUBMIT_ANSWER, payload: response.data });
};


export const fetchAnswers = () => async dispatch => {
  const response = await answers.get('/answers');

  dispatch({ type: FETCH_ANSWERS, payload: response.data });
};


