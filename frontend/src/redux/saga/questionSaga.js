import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOAD_QUESTION,
  SAVE_ANSWER,
  SAVE_QUESTION,
  SET_ANSWER,
  SET_LOADING,
  SET_QUESTION,
} from "../actions/questionActions";
import { getQuestions, saveAnswer, saveQuestions } from "../api/questionApi";

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
}
export function* postAnswer({payload}){
  yield call(saveAnswer, payload); 
  yield fetchQuestion();
}

export default function* questionSaga() {
  yield takeLatest(LOAD_QUESTION, fetchQuestion);
  yield takeLatest(SAVE_QUESTION, saveQuestion);
  yield takeLatest(SAVE_ANSWER, postAnswer);
}
