import { combineReducers } from "redux";
import { SET_LOGIC_QUESTION } from "../actions/logicActions";

const defaultLogicQuestion = null;

const currentLogicQuestion = (state = defaultLogicQuestion, action) => {
  switch (action.type) {
    case SET_LOGIC_QUESTION: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  currentLogicQuestion,
});
