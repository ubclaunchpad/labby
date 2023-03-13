import { call, put, takeLatest } from "redux-saga/effects";
import { FILTER_BILLABLE, LOAD_BILLABLE, SET_BILLABLE, SET_OG_BILLABLE } from "../actions/billingActions";
import { getBillable, getBillableByFilter } from "../api/billingApi";

export function* loadBillableSaga() {
  const billableList = yield call(getBillable);
  yield put({ type: SET_BILLABLE, payload: billableList.data });
  yield put({ type: SET_OG_BILLABLE, payload: billableList.data });
}

export function* filterBillableSaga({payload}) {
  const billableList = yield call(getBillableByFilter, payload);
  yield put({ type: SET_BILLABLE, payload: billableList.data });
}

export default function* billingSaga() {
  yield takeLatest(LOAD_BILLABLE, loadBillableSaga);
  yield takeLatest(FILTER_BILLABLE, filterBillableSaga);
}

