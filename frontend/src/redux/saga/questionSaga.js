import { call, put, takeLatest } from "redux-saga/effects";
import {
  DELETE_ANSWER,
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_ANSWER,
  SAVE_QUESTION,
  SET_ANSWER,
  SET_LOADING,
  SET_QUESTION,
} from "../actions/questionActions";
import { getQuestions, removeAnswer, removeQuestion, saveAnswer, saveQuestions } from "../api/questionApi";

export function* fetchQuestion() {
  console.log("fetching")
  yield put({ type: SET_LOADING, payload: true });

  const questions = yield call(getQuestions);

  yield put({ type: SET_QUESTION, payload: questions.data });
  yield put({ type: SET_ANSWER, payload: questions.data });
  yield put({ type: SET_LOADING, payload: false });
  yield put({type: SET_LOADING, payload: questions.data});
}

export function* saveQuestion({ payload }) {
  yield call(saveQuestions, payload);
  yield fetchQuestion();
}

export function* deleteQuestion({ payload }) {
  yield call(removeQuestion, payload);
  yield fetchQuestion();
}

export function* postAnswer({payload}) {
  yield call(saveAnswer, payload); 
  yield fetchQuestion();
}

export function* deleteAnswer({payload}) {
  yield call(removeAnswer, payload);
  yield fetchQuestion();
}

export default function* questionSaga() {
  yield takeLatest(LOAD_QUESTION, fetchQuestion);
  yield takeLatest(SAVE_QUESTION, saveQuestion);
  yield takeLatest(DELETE_QUESTION, deleteQuestion);
  yield takeLatest(SAVE_ANSWER, postAnswer);
  yield takeLatest(DELETE_ANSWER, deleteAnswer);
}
