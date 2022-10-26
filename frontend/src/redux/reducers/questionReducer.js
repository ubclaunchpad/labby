import { combineReducers } from "redux";
import { SET_QUESTION } from "../actions/questionActions";

const defaultQuestionList = [];

const questionList = (state = defaultQuestionList, action) => {
  switch (action.type) {
    case SET_QUESTION: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  questionList,
});
