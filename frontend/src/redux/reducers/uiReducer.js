import { combineReducers } from "redux";
import { TOGGLE_LOGIC } from "../actions/uiActions";

const defaultLogicView = false;

const logicView = (state = defaultLogicView, action) => {
  switch (action.type) {
    case TOGGLE_LOGIC: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  logicView,
});

