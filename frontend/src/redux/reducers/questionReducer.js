import { combineReducers } from "redux";
import { REPLACE_QUESTION, SET_QUESTION } from "../actions/questionActions";

const defaultQuestionList = [];

const questionList = (state = defaultQuestionList, action) => {
  switch (action.type) {
    case SET_QUESTION: {
      return action.payload;
    }
    case REPLACE_QUESTION: {
      const {questionIndex, questionObject} = action.payload; 
      state[questionIndex] = questionObject; 
      return [...state];
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  questionList,
});
