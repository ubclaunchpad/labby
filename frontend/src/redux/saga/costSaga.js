import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {LOAD_COST, SET_COST} from "../actions/costActions";
import { getCosts } from "../api/costApi";
  
export default function* costSaga() {
    console.log("saga");
    yield takeEvery(LOAD_COST, fetchCost);
  }

export function* fetchCost() {
    console.log("fetching");
 
    const costEstimates = yield call(getCosts); //api call for all costs

    yield put({ type: SET_COST, payload: costEstimates.data }); //got all costs?
  }