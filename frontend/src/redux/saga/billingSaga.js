import { call, put, takeLatest } from "redux-saga/effects";
import { LOAD_BILLABLE, SET_BILLABLE } from "../actions/billingActions";
import { getBillable } from "../api/billingApi";

export function* loadBillableSaga() {
  const billableList = yield call(getBillable);
  yield put({ type: SET_BILLABLE, payload: billableList.data });
}

export default function* billingSaga() {
  yield takeLatest(LOAD_BILLABLE, loadBillableSaga);
}

