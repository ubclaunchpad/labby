import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_USER, LOAD_USERLIST, POST_USER, SET_USERLIST } from "../actions/userActions";
import { deleteUserApi, getUserlist, saveUserApi } from "../api/userApi";

export function* loadUserlistSaga() {
  const userList = yield call(getUserlist);
  yield put({ type: SET_USERLIST, payload: userList.data });
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
}

