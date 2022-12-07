import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import {LOAD_COST, SET_COST} from "../actions/costActions";
import { getCosts, getCost} from "../api/costApi";

export function* fetchCost({ payload }) {
  const costs = [];
    console.log("fetching");
    let organization = "UBC";
  
    if (payload.formResponses.length != 0) {
      for (var i = 0; i < payload.formResponses.length; i++) {
        const org = payload.formResponses[i].question.fk_organization_id;
        if (org != null) {
          organization = org;
        }
      }
    } 
    costs.push(organization);

    const costEstimates = yield call(getCosts); 
    costs.push(costEstimates.data);

    yield put({ type: SET_COST, payload: costs }); 
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
  
    
    export default function* costSaga() {
      yield takeEvery(LOAD_COST, fetchCost);
    }

