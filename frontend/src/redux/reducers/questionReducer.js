import { combineReducers } from "redux";
import { REPLACE_QUESTION, SET_QUESTION } from "../actions/questionActions";

const defaultQuestionList = [];

const questionList = (state = defaultQuestionList, action) => {
  switch (action.type) {
    case SET_QUESTION: {
      var questionIds = [];
      var finalQuestions = [];
      action.payload.forEach((question) => {
        if (!questionIds.includes(question.question_id)) {
          questionIds.push(question.question_id);
          finalQuestions.push(question);
        }
      });
      return finalQuestions;
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
