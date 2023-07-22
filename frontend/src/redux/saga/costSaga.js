import { call, put, takeEvery } from "redux-saga/effects";
import { DELETE_SERVICE, LOAD_ALL_COST, LOAD_COST, SET_ALL_COST, SET_COST, UPDATE_COST, UPDATE_QUANTIFIABLE } from "../actions/costActions";
import { deleteCosts, getCosts, postCosts, updateQuantifiableApi } from "../api/costApi";

export function* fetchCost({ payload }) {
  const costs = [];
  let category = "Industry";

  if (payload.formResponses.length !== 0) {
    for (var i = 0; i < payload.formResponses.length; i++) {
      const price_category = payload.formResponses[i].question.price_category;
      if (price_category != null) {
        category = price_category;
        break;
      }
    }
  }
  costs.push(category);

  const costEstimates = yield call(getCosts);
  costs.push(costEstimates.data);

  yield put({ type: SET_COST, payload: costs });
}

export function* fetchAllCost() {
  const costList = yield call(getCosts);
  yield put({ type: SET_ALL_COST, payload: costList.data });
}

export function* deleteServiceCost({ payload }) {
  yield call(deleteCosts, payload);
  yield fetchAllCost();
}

export function* updateCost({ payload }) {
  yield call(postCosts, payload);
  yield fetchAllCost();
}

export function* updateQuantifiable({ payload }) {
  yield call(updateQuantifiableApi, payload);
  yield fetchAllCost();
}

export default function* costSaga() {
  yield takeEvery(LOAD_COST, fetchCost);
  yield takeEvery(LOAD_ALL_COST, fetchAllCost)
  yield takeEvery(DELETE_SERVICE, deleteServiceCost)
  yield takeEvery(UPDATE_COST, updateCost)
  yield takeEvery(UPDATE_QUANTIFIABLE, updateQuantifiable)
}
