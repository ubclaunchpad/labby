import { call, put, takeEvery } from "redux-saga/effects";
import {LOAD_COST, SET_COST} from "../actions/costActions";
import { getCosts} from "../api/costApi";

export function* fetchCost({ payload }) {
  const costs = [];
    let organization = "UBC";
  
    if (payload.formResponses.length !== 0) {
      for (var i = 0; i < payload.formResponses.length; i++) {
        const org = payload.formResponses[i].question.fk_organization_id;
        if (org != null) {
          organization = org;
          break;
        }
      }
    } 
    costs.push(organization);

    const costEstimates = yield call(getCosts); 
    costs.push(costEstimates.data);

    yield put({ type: SET_COST, payload: costs }); 
  }
  
    
    export default function* costSaga() {
      yield takeEvery(LOAD_COST, fetchCost);
    }

