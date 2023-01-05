import { combineReducers } from "redux";
import { ticketBoardData } from "../../components/DragAndDrop/ticket-dnd-data";
import {
  SET_ACTIVE_TICKET,
  SET_TICKETS,
  UPDATE_TICKET_BOARD,
} from "../actions/ticketActions";

const ticketBoardDndData = (state = ticketBoardData, action) => {
  switch (action.type) {
    case UPDATE_TICKET_BOARD: {
      return action.payload;
    }
    case SET_TICKETS: {
      let ticketMap = {};
      let openList = [];
      let inProgressList = [];
      let doneList = [];
      let blockedList = [];
      action.payload.forEach((ticket) => {
        if (ticket.subtask_id) {
          ticketMap[ticket.subtask_id] = {
            id: ticket.subtask_id,
            code: ticket.subtask_id,
            title: ticket.subtask_title,
            description: ticket.subtask_description,
            assignees: [],
            reminder: false,
          };
          if (ticket.subtask_state === "completed") {
            doneList.push(ticket.subtask_id);
          }
          if (ticket.subtask_state === "open") {
            openList.push(ticket.subtask_id);
          }
          if (ticket.subtask_state === "progress") {
            inProgressList.push(ticket.subtask_id);
          }
          if (ticket.subtask_state === "blocked") {
            blockedList.push(ticket.subtask_id);
          }
        } else {
          ticketMap[ticket.task_id] = {
            id: ticket.task_id,
            code: ticket.task_id,
            title: ticket.task_title,
            description: ticket.task_description,
            assignees: [],
            reminder: false,
          };
          if (ticket.task_state === "completed") {
            doneList.push(ticket.task_id);
          }
          if (ticket.task_state === "open") {
            openList.push(ticket.task_id);
          }
          if (ticket.task_state === "progress") {
            inProgressList.push(ticket.task_id);
          }
          if (ticket.task_state === "blocked") {
            blockedList.push(ticket.task_id);
          }
        }
      });

      return {
        ...state,
        columns: {
          blocked: {
            id: "blocked",
            title: "Blocked",
            taskIds: blockedList,
          },
          open: {
            id: "open",
            title: "Open",
            taskIds: openList,
          },
          progress: {
            id: "progress",
            title: "In Progress",
            taskIds: inProgressList,
          },
          completed: {
            id: "completed",
            title: "Completed",
            taskIds: doneList,
          },
        },
        tasks: ticketMap,
      };
    }
    default:
      return state;
  }
};

const currentTicket = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_TICKET: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default combineReducers({ ticketBoardDndData, currentTicket });
