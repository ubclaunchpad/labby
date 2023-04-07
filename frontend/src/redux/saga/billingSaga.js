import { call, put, takeLatest } from "redux-saga/effects";
import { FILTER_BILLABLE, LOAD_BILLABLE, SET_BILLABLE, SET_OG_BILLABLE, UPDATE_CLICKS } from "../actions/billingActions";
import { getBillable, getBillableByFilter, saveClick } from "../api/billingApi";

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

export default function* billingSaga() {
  yield takeLatest(LOAD_BILLABLE, loadBillableSaga);
  yield takeLatest(FILTER_BILLABLE, filterBillableSaga);
  yield takeLatest(UPDATE_CLICKS, updateClicksSaga);
}

