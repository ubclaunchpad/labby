import { all, fork } from 'redux-saga/effects';
import mySaga from './questionSaga';

export default function* rootSaga() {
    yield all([
      fork(mySaga)
    ]);
  }