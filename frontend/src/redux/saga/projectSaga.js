import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_PROJECT, SET_PROJECT } from "../actions/billingActions";
import { UPDATE_ORG_ASSIGNMENT } from "../actions/userActions";
import { getProjectApi } from "../api/projectApi";
import { addAssignmentApi, clearAssignmentApi } from "../api/userApi";
import { loadOrganizationSaga } from "./userSaga";

export function* loadProjectSaga() {
  const projectList = yield call(getProjectApi);
  yield put({ type: SET_PROJECT, payload: projectList.data });
}

export function* updateOrgAssignment({ payload }) {
  yield call(clearAssignmentApi, payload.organization_id);
  yield all(
    payload.newAssignmentList.map((response) => {
      return call(addAssignmentApi, response);
    })
  );

  yield loadProjectSaga();
  yield loadOrganizationSaga();
}

export default function* projectSaga() {
  yield takeLatest(GET_PROJECT, loadProjectSaga);
  yield takeLatest(UPDATE_ORG_ASSIGNMENT, updateOrgAssignment);
}
