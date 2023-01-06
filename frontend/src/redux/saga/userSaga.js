import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_USER, LOAD_EMPLOYEE, LOAD_USERLIST, POST_USER, SET_EMPLOYEE, SET_USERLIST } from "../actions/userActions";
import { deleteUserApi, getEmployeeList, getUserlist, saveUserApi } from "../api/userApi";

export function* loadUserlistSaga() {
  const userList = yield call(getUserlist);
  yield put({ type: SET_USERLIST, payload: userList.data });
}

export function* loadEmployeeSaga() {
  const employeeList = yield call(getEmployeeList);
  yield put({ type: SET_EMPLOYEE, payload: employeeList.data });
}

export function* deleteUserSaga({ payload }) {
  yield call(deleteUserApi, payload);
  yield loadUserlistSaga();
}

export function* postUserSaga({ payload }) {
  yield call(saveUserApi, payload);
  yield loadUserlistSaga();
}

export default function* userSaga() {
  yield takeLatest(LOAD_USERLIST, loadUserlistSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(POST_USER, postUserSaga);
  yield takeLatest(LOAD_EMPLOYEE, loadEmployeeSaga)
}

