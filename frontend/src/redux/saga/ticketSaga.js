import { call, put, takeLatest } from "redux-saga/effects";
import { GET_TICKET_BOARD, SET_TICKETS } from "../actions/ticketActions";
import { getTickets } from "../api/ticketApi";

export function* fetchTickets() {
  const ticketList = yield call(getTickets);

  yield put({ type: SET_TICKETS, payload: ticketList.data });
}
export default function* ticketSaga() {
  yield takeLatest(GET_TICKET_BOARD, fetchTickets);
}
