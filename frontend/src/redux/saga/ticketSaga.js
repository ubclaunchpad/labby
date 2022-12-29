import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_TICKET_BOARD,
  SET_TICKETS,
  UPDATE_TICKET_STATUS,
} from "../actions/ticketActions";
import { getTickets, updateTicketStatusApi } from "../api/ticketApi";

export function* fetchTickets() {
  const ticketList = yield call(getTickets);

  yield put({ type: SET_TICKETS, payload: ticketList.data });
}

export function* updateTicketStatus(action) {
  const { ticketId, status } = action.payload;
  yield call(updateTicketStatusApi, { ticketId, status });
}

export default function* ticketSaga() {
  yield takeLatest(GET_TICKET_BOARD, fetchTickets);
  yield takeLatest(UPDATE_TICKET_STATUS, updateTicketStatus);
}
