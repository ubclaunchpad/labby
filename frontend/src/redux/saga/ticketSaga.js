import AWS from "aws-sdk";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_SUBTASKS,
  ASSIGN_USER,
  GET_ATTACHMENTS,
  GET_SERVICE_COST,
  GET_SUBTASKS,
  GET_TICKET_BOARD,
  POST_SERVICE_COST,
  REMOVE_SERVICE_COST,
  SET_ATTACHMENTS,
  // SET_ACTIVE_TICKET,
  SET_SERVICE_COST,
  SET_SUBTASKS,
  SET_TICKETS,
  UNASSIGN_USER,
  UPDATE_TICKET_DESCRIPTION,
  UPDATE_TICKET_STATUS,
  FILTER_TICKETS,
  UPDATE_TICKET_TITLE,
  CLEAR_ATTACHMENTS,
  DELETE_VIEW_SUMMARY,
} from "../actions/ticketActions";
import {
  assignUserApi,
  deleteServiceCost,
  getAssignees,
  getServiceCostApi,
  getSubTickets,
  getTickets,
  postServiceCostApi,
  unassignUserApi,
  updateTicketDescriptionApi,
  updateTicketStatusApi,
  getSubTicketsById,
  createSubtask,
  updateTicketTitleApi,
} from "../api/ticketApi";

import { getAnswersBySurvey } from "../api/questionApi";

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

export function* updateTicketTitle(action) {
  const { ticketId, title } = action.payload;
  yield call(updateTicketTitleApi, { ticketId, title });
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

const config = new AWS.Config({
  // Deprecated method of passing accessKeyId and secretAccessKey -- could not get new method to work
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  region: "ca-central-1",
});

export function* getAttachments(action) {
  // call martins endpoint
  const surveyAnswers = yield call(getAnswersBySurvey, action.payload);

  // map / filter / reduce that list to only return just list of fileInputs
  const filteredAnswers = surveyAnswers.data.filter((answer) => {
    return (
      answer.answerid != null && answer.answerid.startsWith("fileInput/", 0)
    );
  });

  const blobList = yield all(
    filteredAnswers.map((ans) => {
      return call(async (answer) => {
        AWS.config.update(config);
        const S3 = new AWS.S3({});
        const objParams = {
          Bucket: process.env.REACT_APP_S3_BUCKET,
          Key: answer.answerid,
          ResponseContentType: "application/octet-stream",
        };

        const res = await S3.getObject(objParams).promise();
        const url = window.URL.createObjectURL(
          new Blob([res.Body], { type: "application/octet-stream" })
        );

        return { key: answer.answerid, url };
      }, ans);
    })
  );

  yield put({ type: CLEAR_ATTACHMENTS });

  for (const blob of blobList) {
    yield put({
      type: SET_ATTACHMENTS,
      payload: {
        key: blob.key,
        value: blob.url,
      },
    });
  }
}

export function* deleteViewSummary(action) {
  yield call(async () => {
    AWS.config.update(config);
    const S3 = new AWS.S3({});
    const objParams = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: `requestSummary/${action.payload.ticket_id}`
    };

    await S3.deleteObject(objParams).promise();
  });
}

// Need to know why there is an infinite loop and how to connect the saga to call the API properly.
export function* filterTickets(action) {
  const ticketList = yield call(getTickets);
  const subticketList = yield call(getSubTickets);
  const allTickets = ticketList.data.concat(subticketList.data);
  const filteredTickets = allTickets.filter((ticket) => {
    return ticket.task_state === action.payload;
  });
  console.log(filteredTickets);
  yield put({
    type: FILTER_TICKETS,
    payload: {
      ticketList: filteredTickets,
    },
  });
}

export default function* ticketSaga() {
  yield takeLatest(GET_TICKET_BOARD, fetchTickets);
  yield takeLatest(UPDATE_TICKET_STATUS, updateTicketStatus);
  yield takeLatest(UPDATE_TICKET_TITLE, updateTicketTitle);
  yield takeLatest(UPDATE_TICKET_DESCRIPTION, updateTicketDescription);
  yield takeLatest(ASSIGN_USER, assignUser);
  yield takeLatest(UNASSIGN_USER, unassignUser);
  yield takeLatest(POST_SERVICE_COST, postServiceCost);
  yield takeLatest(REMOVE_SERVICE_COST, removeServiceCost);
  yield takeLatest(GET_SERVICE_COST, getServiceCost);
  yield takeLatest(ADD_SUBTASKS, addSubtask);
  yield takeLatest(GET_SUBTASKS, getSubtasks);
  yield takeLatest(GET_ATTACHMENTS, getAttachments);
  yield takeLatest(FILTER_TICKETS, filterTickets);
  yield takeLatest(DELETE_VIEW_SUMMARY, deleteViewSummary);
}
