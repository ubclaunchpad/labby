import { call, put, takeLatest } from "redux-saga/effects";
import { FILTER_BILLABLE, LOAD_BILLABLE, SET_BILLABLE, SET_OG_BILLABLE, LOAD_BILLABLE_BY_SOWID, SET_BILLABLE_BY_SOWID, UPDATE_CLICKS, BILL_BILLABLE } from "../actions/billingActions";
import { billBillable, getBillable, getBillableByFilter, getBillableBySOWID, saveClick } from "../api/billingApi";

export function* loadBillableSaga() {
  const billableList = yield call(getBillable);
  yield put({ type: SET_BILLABLE, payload: billableList.data });
  yield put({ type: SET_OG_BILLABLE, payload: billableList.data });
}

export function* filterBillableSaga({payload}) {
  const billableList = yield call(getBillableByFilter, payload);
  yield put({ type: SET_BILLABLE, payload: billableList.data });
}

export function* updateClicksSaga({ payload }) {
  yield call(saveClick, payload);
}

export function* loadBillableBySOWIDSaga({ payload }) {
  const billableList = yield call(getBillableBySOWID, payload);
  yield put({ type: SET_BILLABLE_BY_SOWID, payload: { data: billableList.data, sowId: payload.sowId }});
}

export function* billBillableSaga({ payload }) {
  yield call(billBillable, payload);
}

export default function* billingSaga() {
  yield takeLatest(LOAD_BILLABLE, loadBillableSaga);
  yield takeLatest(LOAD_BILLABLE_BY_SOWID, loadBillableBySOWIDSaga);
  yield takeLatest(FILTER_BILLABLE, filterBillableSaga);
  yield takeLatest(UPDATE_CLICKS, updateClicksSaga);
  yield takeLatest(BILL_BILLABLE, billBillableSaga);
}

