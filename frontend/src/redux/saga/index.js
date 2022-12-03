import { all, fork } from 'redux-saga/effects';
import questionSaga from './questionSaga';
import logicSaga from './logicSaga';
import surveySaga from './surveySaga';
import costSaga from './costSaga';

export default function* rootSaga() {
    yield all([
      fork(questionSaga),
      fork(logicSaga),
      fork(surveySaga),
      fork(costSaga)
    ]);
  }