import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_FORM, LOAD_FORMS, SAVE_FORM, SET_FORMS } from "../actions/formActions";
import { deleteFormApi, getForms, saveFormsApi } from "../api/formApi";

export function* fetchForm() {
  const formList = yield call(getForms);

  yield put({ type: SET_FORMS, payload: formList.data });
}

export function* saveForm({ payload }) {
  yield call(saveFormsApi, payload);
  yield fetchForm();
}

export function* deleteForm({ payload }) {
  yield call(deleteFormApi, payload);
  yield fetchForm();
}

export default function* formSaga() {
  yield takeLatest(LOAD_FORMS, fetchForm);
  yield takeLatest(SAVE_FORM, saveForm);
  yield takeLatest(DELETE_FORM, deleteForm);
}
