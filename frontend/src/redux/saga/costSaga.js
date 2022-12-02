import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {LOAD_COST, SET_COST} from "../actions/costActions";
import { getCosts } from "../api/costApi";
  
export default function* costSaga() {
    yield takeEvery(LOAD_COST, fetchCost);
  }

export function* fetchCost() {
    console.log("fetching");
 
    const costEstimates = yield call(getCosts); //api call for all costs

    yield put({ type: SET_COST, payload: costEstimates.data }); //got all costs?
  }

//   export default function* questionSaga() {
//     yield takeLatest(LOAD_QUESTION, fetchQuestion);
//     yield takeEvery(SAVE_QUESTION, saveQuestion);
   
//   the first event listener adds answer to list
//   for answer in list, filter for 