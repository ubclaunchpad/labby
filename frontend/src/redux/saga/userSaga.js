import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STOP_LOADING } from "../actions/uiActions";
import {
  DELETE_ORGANIZATION,
  DELETE_USER,
  GET_ORGANIZATION,
  LOAD_EMPLOYEE,
  LOAD_USERLIST,
  POST_ORGANIZATION,
  POST_USER,
  AUTHENTICATE_USER,
  SET_EMPLOYEE,
  SET_ORGANIZATION,
  SET_USERLIST,
  SET_CURRENT_USER,
  SET_PENDING_USER,
  APPROVE_USER,
  APPROVE_ALL_USER,
  PING,
  GET_PENDING_USER,
  GET_USER,
  SET_OG_CURRENT_USER,
  UPDATE_USER,
  REQUEST_RESET,
  RESET_PASSWORD,
  ADMIN_RESET_PASSWORD,
} from "../actions/userActions";
import { getProjectAssignmentApi } from "../api/projectApi";
import {
  deleteOrganizationApi,
  deleteUserApi,
  getEmployeeList,
  getOrganizationApi,
  getUserlist,
  postOrganizationApi,
  saveUserApi,
  authenticateUserApi,
  pingCheckApi,
  getPendingUserlist,
  approveUserList,
  getUserApi,
  updateUserApi,
  requestResetApi,
  resetPasswordApi,
  adminResetPasswordApi,
} from "../api/userApi";
import { ErrorToast, SuccessToast } from "../../components/Toasts";

export function* loadPendingUserListSaga() {
  const userPendingList = yield call(getPendingUserlist);
  yield put({ type: SET_PENDING_USER, payload: userPendingList.data });
}

export function* approvePendingUserSaga({ payload }) {
  yield call(approveUserList, payload);
  yield loadUserlistSaga();
  yield loadPendingUserListSaga();
}

export function* approveAllPendingUserSaga({ payload }) {
  const parsed_payload = {};
  const userPendingIDList = payload.map((user) => user.user_id);
  parsed_payload["users"] = userPendingIDList;

  yield call(approveUserList, parsed_payload);
  yield delay(1000);
  yield loadUserlistSaga();
  yield loadPendingUserListSaga();
}

export function* loadUserlistSaga() {
  const userList = yield call(getUserlist);
  yield put({ type: SET_USERLIST, payload: userList.data });
}

export function* loadEmployeeSaga() {
  const employeeList = yield call(getEmployeeList);
  yield put({ type: SET_EMPLOYEE, payload: employeeList.data });
}

export function* getUserSaga({ payload }) {
  const user = yield call(getUserApi, payload);
  if (user.data.length > 0) {
    yield put({ type: SET_CURRENT_USER, payload: user.data[0] });
  }
}

export function* deleteUserSaga({ payload }) {
  yield call(deleteUserApi, payload);
  yield loadUserlistSaga();
  yield loadPendingUserListSaga();
}

export function* updateUserSaga({ payload }) {
  yield call(updateUserApi, payload);
  yield loadUserlistSaga();
}

export function* requestResetSaga({ payload }) {
  yield call(requestResetApi, payload);
  SuccessToast("Password reset email sent!");
}

export function* resetPasswordSaga({ payload }) {
  const resetRes = yield call(resetPasswordApi, payload);
  console.log(resetRes);
  if (resetRes) {
    SuccessToast("Password reset successfully! Please login to continue.");
    payload.navTo();
  } else {
    ErrorToast("Password reset failed. Please try again.");
  }
}

export function* adminResetPasswordSaga({ payload }) {
  const resetRes = yield call(adminResetPasswordApi, payload);
  if (resetRes) {
    SuccessToast("Password reset successfully!");
  } else {
    ErrorToast("Password reset failed. Please try again.");
  }
}

export function* postUserSaga({ payload }) {
  const newUser = yield call(saveUserApi, payload);
  if (payload.adminCreated) {
    SuccessToast("Account created successfully!");
    yield call(approveUserList, { users: [payload.user_id]});
    yield delay(1000);
    yield loadUserlistSaga();
    yield loadPendingUserListSaga();
  } else if (newUser) {
    SuccessToast("Account created successfully! Please login to continue.");
    payload.navTo();
  } else {
    ErrorToast("Account creation failed. Please try again.");
  }
}

export function* authenticateUserSaga({ payload }) {
  const currentUser = yield call(authenticateUserApi, payload);
  if (currentUser) {
    yield put({ type: SET_CURRENT_USER, payload: currentUser.data });
    yield put({ type: SET_OG_CURRENT_USER, payload: currentUser.data })
    localStorage.setItem("currentUser", JSON.stringify(currentUser.data));
  } else {
    ErrorToast("Invalid username or password");
  }
}

export function* loadOrganizationSaga() {
  const organizationList = yield call(getOrganizationApi);
  const projectAssignmentList = yield call(getProjectAssignmentApi);
  yield put({
    type: SET_ORGANIZATION,
    payload: {
      organizationList: organizationList.data,
      projectAssignmentList: projectAssignmentList.data,
    },
  });
}

export function* postOrganizationSaga({ payload }) {
  yield call(postOrganizationApi, payload);
  yield loadOrganizationSaga();
}

export function* deleteOrganizationSaga({ payload }) {
  yield call(deleteOrganizationApi, payload);
  yield loadOrganizationSaga();
}

export function* pingCheckSaga({ payload }) {
  const res = yield call(pingCheckApi, payload);
  if (res.status === 200) {
    yield put({ type: SET_CURRENT_USER, payload: payload });
    yield put({ type: SET_OG_CURRENT_USER, payload: payload })
  } else {
    yield put({ type: SET_CURRENT_USER, payload: null });
    yield put({ type: SET_OG_CURRENT_USER, payload: null })
  }
  yield put({ type: STOP_LOADING });
}

export default function* userSaga() {
  yield takeLatest(APPROVE_ALL_USER, approveAllPendingUserSaga);
  yield takeLatest(APPROVE_USER, approvePendingUserSaga);
  yield takeLatest(GET_PENDING_USER, loadPendingUserListSaga);
  yield takeLatest(LOAD_USERLIST, loadUserlistSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(POST_USER, postUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(LOAD_EMPLOYEE, loadEmployeeSaga);
  yield takeLatest(GET_ORGANIZATION, loadOrganizationSaga);
  yield takeLatest(POST_ORGANIZATION, postOrganizationSaga);
  yield takeLatest(DELETE_ORGANIZATION, deleteOrganizationSaga);
  yield takeLatest(AUTHENTICATE_USER, authenticateUserSaga);
  yield takeLatest(PING, pingCheckSaga);
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(REQUEST_RESET, requestResetSaga);
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(ADMIN_RESET_PASSWORD, adminResetPasswordSaga);
}
