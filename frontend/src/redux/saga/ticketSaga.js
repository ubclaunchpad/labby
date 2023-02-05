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
  FILTER_TICKETS
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
  yield call(getServiceCost, { payload: action.payload.sow_id });
}

export function* removeServiceCost(action) {
  yield call(deleteServiceCost, action.payload);
  yield call(getServiceCost, { payload: action.payload.sow_id });
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
  yield call(getSubtasks, { payload: action.payload.ticket_id });
}

export function* getAttachments(action) {
  const config = new AWS.Config({
    // Deprecated method of passing accessKeyId and secretAccessKey -- could not get new method to work
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    region: "ca-central-1",
  });

  // call martins endpoint
  const surveyAnswers = yield call(getAnswersBySurvey, action.payload);
  console.log(surveyAnswers.data[0]);

  // map / filter / reduce that list to only return just list of fileInputs
  const filteredAnswers = surveyAnswers.data[0].filter((answer) => {
    return (
      answer.answerid != null && answer.answerid.startsWith("fileInput/", 0)
    );
  });

  console.log(filteredAnswers);

  // call s3 endpoints for each file inside the fileInput list
  yield all(
    filteredAnswers.map((answer) => {
      AWS.config.update(config);
      const S3 = new AWS.S3({});
      const objParams = {
        Bucket: "labby-app",
        Key: answer.answerid,
        ResponseContentType: "application/pdf",
      };
      // TODO: Need to change where it only uploads to bucket upon form submission
      return S3.getObject(objParams, function (err, data) {
        if (err) {
          console.log("Issue in S3.getObject()");
          console.log(`Error Code: ${err.code}`);
          console.log(`Error Message: ${err.message}`);
        } else {
          console.log("Download completed in S3.getObject()");
          const url = window.URL.createObjectURL(
            new Blob([data.Body], { type: "application/pdf" })
          );
          return put({
            type: SET_ATTACHMENTS,
            payload: {
              key: answer.answerid,
              value: url,
            },
          });
        }
      });
    })
  );

  // store that all into a reducer
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
  yield takeLatest(GET_ATTACHMENTS, getAttachments);
  yield takeLatest(FILTER_TICKETS, filterTickets);
}
