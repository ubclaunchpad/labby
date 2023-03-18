import { call, put, takeLatest } from "redux-saga/effects";
import { getBillable, getBillableBySOWID } from "../api/billingApi";
import { FILTER_BILLABLE, LOAD_BILLABLE, SET_BILLABLE, SET_OG_BILLABLE, LOAD_BILLABLE_BY_SOWID, SET_BILLABLE_BY_SOWID } from "../actions/billingActions";
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

export function* loadBillableBySOWIDSaga({ payload }) {
  const billableList = yield call(getBillableBySOWID, payload);
  yield put({ type: SET_BILLABLE_BY_SOWID, payload: { data: billableList.data, sowID: payload.survey_id }});
}

export default function* billingSaga() {
  yield takeLatest(LOAD_BILLABLE, loadBillableSaga);
  yield takeLatest(LOAD_BILLABLE_BY_SOWID, loadBillableBySOWIDSaga);
  yield takeLatest(FILTER_BILLABLE, filterBillableSaga);
}

