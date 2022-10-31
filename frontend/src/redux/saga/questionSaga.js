import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOAD_QUESTION,
  REPLACE_QUESTION,
  SAVE_QUESTION,
  SET_LOADING,
  SET_QUESTION,
} from "../actions/questionActions";
import { getQuestions, saveQuestions } from "../api/questionApi";

export function* fetchQuestion() {
  yield put({ type: SET_LOADING, payload: true });

  const questions = yield call(getQuestions);

  yield put({ type: SET_QUESTION, payload: questions.data });
  yield put({ type: SET_LOADING, payload: false });
  yield put ({type: SET_LOADING, payload: questions.data});
}

export function* saveQuestion({ payload }) {
  yield call(saveQuestions, payload);
}
export function* replaceQuestion({payload}){
  yield call(saveQuestions, payload.questionObject); 
}

export default function* questionSaga() {
  yield takeLatest(LOAD_QUESTION, fetchQuestion);
  yield takeLatest(SAVE_QUESTION, saveQuestion);
  yield takeLatest(REPLACE_QUESTION,replaceQuestion );
}
