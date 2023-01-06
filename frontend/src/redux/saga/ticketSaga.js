import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_TICKET_BOARD,
  SET_TICKETS,
  UPDATE_TICKET_DESCRIPTION,
  UPDATE_TICKET_STATUS,
} from "../actions/ticketActions";
import {
  getAssignees,
  getSubTickets,
  getTickets,
  updateTicketDescriptionApi,
  updateTicketStatusApi,
} from "../api/ticketApi";

export function* fetchTickets() {
  const assigneeList = yield call(getAssignees);
  const ticketList = yield call(getTickets);
  const subticketList = yield call(getSubTickets);

  yield put({
    type: SET_TICKETS,
    payload: {
      ticketList: ticketList.data.concat(subticketList.data),
      assigneeList: assigneeList.data,
    },
  });
}

export function* updateTicketStatus(action) {
  const { ticketId, status } = action.payload;
  yield call(updateTicketStatusApi, { ticketId, status });
  yield call(fetchTickets);
}

export function* updateTicketDescription(action) {
  const { ticketId, description } = action.payload;
  yield call(updateTicketDescriptionApi, { ticketId, description });
  yield call(fetchTickets);
}

export default function* ticketSaga() {
  yield takeLatest(GET_TICKET_BOARD, fetchTickets);
  yield takeLatest(UPDATE_TICKET_STATUS, updateTicketStatus);
  yield takeLatest(UPDATE_TICKET_DESCRIPTION, updateTicketDescription);
}
