import { call, takeLatest } from "redux-saga/effects";
import { DELETE_LOGIC } from "../actions/logicActions";
import { deleteLogic } from "../api/logicApi";
import { fetchQuestion } from "./questionSaga";

export function* deleteLogicSaga({ payload }) {
  yield call(deleteLogic, payload);
  yield call(fetchQuestion, { payload: payload.form_id });
}

export default function* logicSaga() {
  yield takeLatest(DELETE_LOGIC, deleteLogicSaga);
}
