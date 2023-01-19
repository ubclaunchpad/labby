import { combineReducers } from "redux";
import { SET_PROJECT } from "../actions/billingActions";

const defaultProjectList = [];

const projectList = (state = defaultProjectList, action) => {
  switch (action.type) {
    case SET_PROJECT: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  projectList,
});
