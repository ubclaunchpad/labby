import { call, put, takeLatest } from 'redux-saga/effects'
import { SET_LOADING, SET_QUESTION } from '../actions/questionActions';
import { getQuestions } from '../api/questionApi';

export function* fetchQuestion({ payload }) {
  yield put({ type: SET_LOADING })

  const questions = yield call(getQuestions, payload)

  yield put({ type: SET_QUESTION, payload: questions })
}

export default function* questionSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchQuestion);
  // yield takeLatest("ANOTHER_ACTION", anotherFunction);
}