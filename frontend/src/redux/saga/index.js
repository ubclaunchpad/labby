import { all, fork } from 'redux-saga/effects';
import questionSaga from './questionSaga';
import logicSaga from './logicSaga';

export default function* rootSaga() {
    yield all([
      fork(questionSaga),
      fork(logicSaga)
    ]);
  }