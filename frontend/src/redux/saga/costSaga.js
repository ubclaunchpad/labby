import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import {LOAD_COST, SET_COST} from "../actions/costActions";
import { getCosts, getCost } from "../api/costApi";
  


export function* fetchCost({ payload }) {
    console.log("fetching");
 
    const costEstimates = yield call(getCosts); //api call for all costs
    console.log(costEstimates.data);

    console.log("b");
    console.log(payload);

    const calls = yield [];

    yield payload.formResponses.forEach((response) => {

      const responseBody = {
        responses: response.response,
        organization: response.question.fk_organization_id
      };
      calls.push(call(getCost, responseBody));
    });

    const response = yield all(calls);
    console.log(response);

    yield put({ type: SET_COST, payload: costEstimates.data }); //got all costs?
  }

  //getQuote
  // export function* fetchCost({ payload }) {
  //   const costEstimates = yield call(getCosts, payload);
  //   console.log(costEstimates.);
  //   yield put({ type: SET_COST, payload: costEstimates.data });
  // }

  export default function* costSaga() {
    yield takeEvery(LOAD_COST, fetchCost);
  }