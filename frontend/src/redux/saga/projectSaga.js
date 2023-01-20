import { all, call, put, takeLatest } from "redux-saga/effects";
import { DELETE_PROJECT, GET_PROJECT, POST_PROJECT, SET_PROJECT } from "../actions/billingActions";
import { UPDATE_ORG_ASSIGNMENT } from "../actions/userActions";
import { getCostcenterAssignmentApi } from "../api/costcenterApi";
import { deleteProjectApi, getProjectApi, postProjectApi } from "../api/projectApi";
import { addAssignmentApi, clearAssignmentApi } from "../api/userApi";
import { loadOrganizationSaga } from "./userSaga";

export function* loadProjectSaga() {
  const projectList = yield call(getProjectApi);
  const costcenterAssignmentList = yield call(getCostcenterAssignmentApi);
  yield put({
    type: SET_PROJECT,
    payload: {
      projectList: projectList.data,
      costcenterAssignmentList: costcenterAssignmentList.data,
    },
  });
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

export function* postProjectSaga({ payload }) {
  yield call(postProjectApi, payload);
  yield loadProjectSaga();
}

export function* deleteProjectSaga({ payload }) {
  yield call(deleteProjectApi, payload);
  yield loadProjectSaga();
}

export default function* projectSaga() {
  yield takeLatest(GET_PROJECT, loadProjectSaga);
  yield takeLatest(UPDATE_ORG_ASSIGNMENT, updateOrgAssignment);
  yield takeLatest(POST_PROJECT, postProjectSaga);
  yield takeLatest(DELETE_PROJECT, deleteProjectSaga);
}
