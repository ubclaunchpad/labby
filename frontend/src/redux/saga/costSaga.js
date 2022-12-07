import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import {LOAD_COST, SET_COST} from "../actions/costActions";
import { getCosts, getCost} from "../api/costApi";

export function* fetchCost() {
    console.log("fetching");
 
    const costEstimates = yield call(getCosts); //api call for all costs
    console.log(costEstimates.data);

    yield put({ type: SET_COST, payload: costEstimates.data }); //get all costs?
  }

// export function* fetchCost({ payload }) {
//   console.log(payload);

//   let org = "ubc";

//   if (payload.formResponses.length != 0) {
//     org = payload.formResponses[0].question.fk_organization_id;
//   } 

//   yield all(
//     payload.formResponses.map((response) => {
//       const answer = response.question.answer;
//       const responseBody = {
//               organization: org,
//               responses: response.question.answer_id,
//             };
//       return call(getCost, responseBody);
//     })
//   );
//   console.log(org);
//   console.log(fetchCost);
//   yield put({ type: SET_COST, payload: fetchCost });
//   }

  
//   export default function* costSaga() {
//     yield takeEvery(LOAD_COST, fetchCost);
//   }

//   export function* fetchCost({ payload }) {
//     console.log(payload);
  
//     let org = "ubc";
  
//     if (payload.formResponses.length != 0) {
//       org = payload.formResponses[0].question.fk_organization_id;
//     } 

//     const costEstimates = yield call(getCosts); //api call for all costs
//     console.log(costEstimates.data);
  
//       payload.formResponses.map((response) => {
//         costEstimates.data.forEach((cost) => {
//           if (response.response ==)
//         });
//       });
//     console.log(org);
//     console.log(fetchCost);
//     yield put({ type: SET_COST, payload: fetchCost });
//     }
  
    
    export default function* costSaga() {
      yield takeEvery(LOAD_COST, fetchCost);
    }

  // yield all(
  // payload.formResponses.forEach(response => {
  //   // CostEstimateList.push(response.question.answer_id);
  //   const responseBody = {
  //     organization: org,
  //     responses: response.question.answer_id,
  //   };
  //   const costEstimates = call(getCost, responseBody);
  //   costEstimateMap.set(response.question.answer, costEstimates.data);
  // })
  // );