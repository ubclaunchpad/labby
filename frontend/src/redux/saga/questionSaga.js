import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { SAVE_LOGIC, SET_LOGIC } from "../actions/logicActions";
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
import { getLogics, saveLogics } from "../api/logicApi";
import {
  getQuestions,
  removeAnswer,
  removeQuestion,
  saveAnswer,
  saveQuestions,
} from "../api/questionApi";

export function* fetchQuestion({ payload }) {
  console.log("fetching");
  yield put({ type: SET_LOADING, payload: true });

  const logic = yield call(getLogics);
  
  yield put({ type: SET_LOGIC, payload: logic.data });

  const questions = yield call(getQuestions, payload);

  yield put({ type: SET_QUESTION, payload: questions.data });
  yield put({ type: SET_ANSWER, payload: questions.data });
  yield put({ type: SET_LOADING, payload: false });
  yield put({ type: SET_LOADING, payload: questions.data });
}

export function* saveQuestion({ payload }) {
  yield call(saveQuestions, payload);
}

export function* deleteQuestion({ payload }) {
  yield call(removeQuestion, payload);
}

export function* postAnswer({ payload }) {
  yield call(saveAnswer, payload);
  yield fetchQuestion({ payload: payload.form_id });
}

export function* deleteAnswer({ payload }) {
  yield call(removeAnswer, payload);
  yield fetchQuestion({ payload: payload.form_id });
}

export function* saveLogic({ payload }) {
  yield call(saveLogics, payload);
  yield fetchQuestion({ payload: payload.form_id });
}

export default function* questionSaga() {
  yield takeLatest(LOAD_QUESTION, fetchQuestion);
  yield takeEvery(SAVE_QUESTION, saveQuestion);
  yield takeLatest(DELETE_QUESTION, deleteQuestion);
  yield takeLatest(SAVE_ANSWER, postAnswer);
  yield takeLatest(DELETE_ANSWER, deleteAnswer);
  yield takeLatest(SAVE_LOGIC, saveLogic);
}
