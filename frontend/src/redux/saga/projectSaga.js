import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { DELETE_PROJECT, GET_PROJECT, POST_PROJECT, SET_PROJECT } from "../actions/billingActions";
import { UPDATE_ORG_ASSIGNMENT } from "../actions/userActions";
import { getCostcenterAssignmentApi } from "../api/costcenterApi";
import { deleteProjectApi, getProjectApi, getProjectAssignmentApi, postProjectApi } from "../api/projectApi";
import { addAssignmentApi, clearAssignmentApi } from "../api/userApi";
import { loadOrganizationSaga } from "./userSaga";

export function* loadProjectSaga() {
  const projectList = yield call(getProjectApi);
  const costcenterAssignmentList = yield call(getCostcenterAssignmentApi);
  const organizationAssignmentList = yield call(getProjectAssignmentApi);
  const currentUser = yield select((state) => state.userReducer.currentUser);
  const myOrgProject = organizationAssignmentList
    .data
    .filter((project) => project.fk_organization_id === currentUser.organization_id)
    .map((project) => project.fk_project_id);

  yield put({
    type: SET_PROJECT,
    payload: {
      projectList: projectList.data.filter((project) => myOrgProject.includes(project.project_id) || currentUser.employee),
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
