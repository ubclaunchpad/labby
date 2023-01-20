import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  DELETE_COSTCENTER,
  GET_COSTCENTER,
  POST_COSTCENTER,
  SET_COSTCENTER,
  UPDATE_PROJECT_ASSIGNMENT,
} from "../actions/billingActions";
import {
  addProjectAssignmentApi,
  clearProjectAssignmentApi,
  deleteCostCenterApi,
  getCostcenterApi,
  postCostCenterApi,
} from "../api/costcenterApi";
import { loadProjectSaga } from "./projectSaga";

export function* loadCostCenterSaga() {
  const costCenterList = yield call(getCostcenterApi);
  yield put({ type: SET_COSTCENTER, payload: costCenterList.data });
}

export function* updateProjectAssignment({ payload }) {
  yield call(clearProjectAssignmentApi, payload.project_id);
  yield all(
    payload.newAssignmentList.map((response) => {
      return call(addProjectAssignmentApi, response);
    })
  );

  yield loadCostCenterSaga();
  yield loadProjectSaga();
}

export function* postCostCenterSaga({ payload }) {
  yield call(postCostCenterApi, payload);
  yield loadCostCenterSaga();
}

export function* deleteCostCenterSaga({ payload }) {
  yield call(deleteCostCenterApi, payload);
  yield loadCostCenterSaga();
}

export default function* projectSaga() {
  yield takeLatest(GET_COSTCENTER, loadCostCenterSaga);
  yield takeLatest(UPDATE_PROJECT_ASSIGNMENT, updateProjectAssignment);
  yield takeLatest(POST_COSTCENTER, postCostCenterSaga);
  yield takeLatest(DELETE_COSTCENTER, deleteCostCenterSaga);
}
