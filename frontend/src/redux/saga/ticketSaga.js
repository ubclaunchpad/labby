import { call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_SUBTASKS,
  ASSIGN_USER,
  GET_SERVICE_COST,
  GET_SUBTASKS,
  GET_TICKET_BOARD,
  POST_SERVICE_COST,
  REMOVE_SERVICE_COST,
  // SET_ACTIVE_TICKET,
  SET_SERVICE_COST,
  SET_SUBTASKS,
  SET_TICKETS,
  UNASSIGN_USER,
  UPDATE_TICKET_DESCRIPTION,
  UPDATE_TICKET_STATUS,
  FILTER_TICKETS
} from "../actions/ticketActions";
import {
  assignUserApi,
  deleteServiceCost,
  getAssignees,
  getTaskLabels,
  getServiceCostApi,
  getSubTickets,
  getTickets,
  postServiceCostApi,
  unassignUserApi,
  updateTicketDescriptionApi,
  updateTicketStatusApi,
  getSubTicketsById,
  createSubtask,
} from "../api/ticketApi";

export function* fetchTickets() {
  const assigneeList = yield call(getAssignees);
  const taskLabelList = yield call(getTaskLabels);
  const ticketList = yield call(getTickets);
  const subticketList = yield call(getSubTickets);

  yield put({
    type: SET_TICKETS,
    payload: {
      ticketList: ticketList.data.concat(subticketList.data),
      assigneeList: assigneeList.data,
      taskLabelList: taskLabelList.data,
    },
  });

  // let currentTicket = yield select(
  //   (state) => state.ticketReducer.currentTicket
  // );

  // if (currentTicket) {
  //   let allTickets = yield select(
  //     (state) => state.ticketReducer.ticketBoardDndData
  //   );
  //   let newTicket = allTickets.tasks[currentTicket.id];
  //   yield put({ type: SET_ACTIVE_TICKET, payload: newTicket });
  // }
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

export function* getServiceCost(action) {
  const serviceCosts = yield call(getServiceCostApi, action.payload);
  yield put({
    type: SET_SERVICE_COST,
    payload: serviceCosts.data,
  });
}

export function* postServiceCost(action) {
  yield call(postServiceCostApi, action.payload);
  yield call(getServiceCost, { payload: action.payload });
}

export function* removeServiceCost(action) {
  yield call(deleteServiceCost, action.payload);
  yield call(getServiceCost, { payload: action.payload });
}

export function* getSubtasks(action) {
  const subtasks = yield call(getSubTicketsById, action.payload);
  yield put({
    type: SET_SUBTASKS,
    payload: subtasks.data,
  });
}


export function* addSubtask(action) {
  yield call(createSubtask, action.payload);
  yield call(getSubtasks, { payload: action.payload.task_id });
}

// Need to know why there is an infinite loop and how to connect the saga to call the API properly. 
export function* filterTickets(action) {
  console.log("HIT THE SAGA FUNCTION")
  const ticketList = yield call(getTickets);
  const subticketList = yield call(getSubTickets);
  const allTickets = ticketList.data.concat(subticketList.data);
  console.log("THESE ARE ALL TICKETS --> ", allTickets)
  const filteredTickets = allTickets.filter((ticket) => {
    console.log('These are the ticket status -->', ticket.task_state);
    return ticket.task_state === action.payload;
  });
  console.log(filteredTickets)
  yield put({
    type: FILTER_TICKETS,
    payload: {
      ticketList: filteredTickets,
    },
  });

  console.log("These are the new tickets -->",yield call(getTickets));

}
export default function* ticketSaga() {
  yield takeLatest(GET_TICKET_BOARD, fetchTickets);
  yield takeLatest(UPDATE_TICKET_STATUS, updateTicketStatus);
  yield takeLatest(UPDATE_TICKET_DESCRIPTION, updateTicketDescription);
  yield takeLatest(ASSIGN_USER, assignUser);
  yield takeLatest(UNASSIGN_USER, unassignUser);
  yield takeLatest(POST_SERVICE_COST, postServiceCost);
  yield takeLatest(REMOVE_SERVICE_COST, removeServiceCost);
  yield takeLatest(GET_SERVICE_COST, getServiceCost);
  yield takeLatest(ADD_SUBTASKS, addSubtask);
  yield takeLatest(GET_SUBTASKS, getSubtasks);
  yield takeLatest(FILTER_TICKETS, filterTickets);
}