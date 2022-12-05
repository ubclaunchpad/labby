import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import {LOAD_COST, SET_COST} from "../actions/costActions";
import { getCosts} from "../api/costApi";
  


export function* fetchCost() {
    console.log("fetching");
 
    const costEstimates = yield call(getCosts); //api call for all costs
    console.log(costEstimates.data);

    yield put({ type: SET_COST, payload: costEstimates.data }); //get all costs?
  }


  export default function* costSaga() {
    yield takeEvery(LOAD_COST, fetchCost);
  }