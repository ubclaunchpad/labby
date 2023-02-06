import { combineReducers } from "redux";
import { ticketBoardData } from "../../components/DragAndDrop/ticket-dnd-data";
import {
  SET_ACTIVE_TICKET,
  SET_SERVICE_COST,
  SET_SUBTASKS,
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
      let assigneeMap = {};
      
      
      // Map Assignees
      action.payload.assigneeList.forEach((assignee) => {
        let assigneeList = assigneeMap[assignee.task_id] ?? [];
        assigneeList.push(assignee);
        assigneeMap[assignee.task_id] = assigneeList;
      });

      action.payload.ticketList.forEach((ticket) => {
        if (ticket.subtask_id) {
          ticketMap[ticket.subtask_id] = {
            id: ticket.subtask_id,
            form_id: ticket.fk_form_id,
            project_id: ticket.fk_project_id,
            code: ticket.subtask_id,
            title: ticket.subtask_title,
            description: ticket.subtask_description,
            assignees: assigneeMap[ticket.subtask_id] ?? [],
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
        } else if (ticket.subtask_id !== null) {
          // NULL means duplicate from subtask join, undefined means main task ticket
          ticketMap[ticket.task_id] = {
            id: ticket.task_id,
            code: ticket.task_id,
            form_id: ticket.fk_form_id,
            project_id: ticket.fk_project_id,
            title: ticket.task_title,
            description: ticket.task_description,
            assignees: assigneeMap[ticket.task_id] ?? [],
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

const currentTicketServiceCosts = (state = [], action) => {
  switch (action.type) { 
    case SET_SERVICE_COST: {
      return action.payload;
    }
    default:
      return state;
  }
};

const currentTicketSubtasks = (state = [], action) => {
  switch (action.type) {
    case SET_SUBTASKS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default combineReducers({
  ticketBoardDndData,
  currentTicket,
  currentTicketServiceCosts,
  currentTicketSubtasks,
});
