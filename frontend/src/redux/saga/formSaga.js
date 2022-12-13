import { call, put, takeLatest } from "redux-saga/effects";
import { LOAD_FORMS, SET_FORMS } from "../actions/formActions";
import { getForms } from "../api/formApi";

export function* fetchForm() {
  const formList = yield call(getForms);

  yield put({ type: SET_FORMS, payload: formList.data });
}

export default function* formSaga() {
  yield takeLatest(LOAD_FORMS, fetchForm);
}
