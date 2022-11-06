import { call, put, takeLatest } from "redux-saga/effects";
import {
  DELETE_LOGIC,
  SAVE_LOGIC
} from "../actions/logicActions";
import { deleteLogic } from "../api/logicApi";

export function* deleteLogicSaga({ payload }) {
  yield call(deleteLogic, payload);
  yield fetchLogic();
}


export function* fetchLogic() {
  const logics = yield call(deleteLogic);
  yield put({ type: SAVE_LOGIC, payload: logics.data });
}

export default function* logicSaga() {
  yield takeLatest(DELETE_LOGIC, fetchLogic);
  yield takeLatest(DELETE_LOGIC, deleteLogicSaga);
}


