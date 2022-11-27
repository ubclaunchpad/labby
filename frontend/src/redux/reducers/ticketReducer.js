import { combineReducers } from "redux";
import { ticketBoardData } from "../../components/DragAndDrop/ticket-dnd-data";
import { UPDATE_TICKET_BOARD } from "../actions/ticketActions";

const ticketBoardDndData = (state = ticketBoardData, action) => {
  switch (action.type) {
    case UPDATE_TICKET_BOARD: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default combineReducers({ ticketBoardDndData });
