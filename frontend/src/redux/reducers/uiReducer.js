import { combineReducers } from "redux";
import { START_LOADING, STOP_LOADING, TOGGLE_LOGIC } from "../actions/uiActions";

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

const loading = (state = false, action) => {
  switch (action.type) {
    case START_LOADING: {
      return true;
    }
    case STOP_LOADING: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  logicView,
  loading,
});

