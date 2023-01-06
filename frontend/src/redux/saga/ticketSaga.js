import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  ASSIGN_USER,
  GET_TICKET_BOARD,
  SET_ACTIVE_TICKET,
  SET_TICKETS,
  UNASSIGN_USER,
  UPDATE_TICKET_DESCRIPTION,
  UPDATE_TICKET_STATUS,
} from "../actions/ticketActions";
import {
  assignUserApi,
  getAssignees,
  getSubTickets,
  getTickets,
  unassignUserApi,
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

  let currentTicket = yield select(
    (state) => state.ticketReducer.currentTicket
  );

  if (currentTicket) {
    let allTickets = yield select(
      (state) => state.ticketReducer.ticketBoardDndData
    );
    let newTicket = allTickets.tasks[currentTicket.id];
    yield put({ type: SET_ACTIVE_TICKET, payload: newTicket });
  }
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

export function* assignUser(action) {
  yield call(assignUserApi, action.payload);
  yield call(fetchTickets);
}

export function* unassignUser(action) {
  yield call(unassignUserApi, action.payload);
  yield call(fetchTickets);
}

export default function* ticketSaga() {
  yield takeLatest(GET_TICKET_BOARD, fetchTickets);
  yield takeLatest(UPDATE_TICKET_STATUS, updateTicketStatus);
  yield takeLatest(UPDATE_TICKET_DESCRIPTION, updateTicketDescription);
  yield takeLatest(ASSIGN_USER, assignUser);
  yield takeLatest(UNASSIGN_USER, unassignUser);
}
