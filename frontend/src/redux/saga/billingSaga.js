import { call, put, takeLatest } from "redux-saga/effects";
import { LOAD_BILLABLE, LOAD_BILLABLE_BY_SOWID, SET_BILLABLE } from "../actions/billingActions";
import { getBillable, getBillableBySOWID } from "../api/billingApi";

export function* loadBillableSaga() {
  const billableList = yield call(getBillable);
  yield put({ type: SET_BILLABLE, payload: billableList.data });
}

export function* loadBillableBySOWIDSaga({ payload }) {
  console.log("beforeapi")
  const billableList = yield call(getBillableBySOWID, payload);
  console.log("afterapi")
  // yield put({ type: LOAD_BILLABLE_BY_SOWID, payload: billableList.data })
}

export default function* billingSaga() {
  yield takeLatest(LOAD_BILLABLE, loadBillableSaga);
  yield takeLatest(LOAD_BILLABLE_BY_SOWID, loadBillableBySOWIDSaga);
}

