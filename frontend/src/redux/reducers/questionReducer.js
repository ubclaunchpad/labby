import { combineReducers } from "redux";
import {
  REPLACE_QUESTION,
  SET_ANSWER,
  SET_QUESTION,
} from "../actions/questionActions";

const defaultQuestionList = [];
const defaultAnswerList = {};

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
      const { questionIndex, questionObject } = action.payload;
      state[questionIndex] = questionObject;
      return [...state];
    }
    default: {
      return state;
    }
  }
};

const answerList = (state = defaultAnswerList, action) => {
  switch (action.type) {
    case SET_ANSWER: {
      action.payload.forEach((answer) => {
        if (answer.answer_id !== null) {
          var answerForQuestion = state[answer.question_id] ?? [];
          if (
            !answerForQuestion.find(
              ({ answer_id }) => answer_id === answer.answer_id
            )
          ) {
            answerForQuestion.push(answer);
            state[answer.question_id] = answerForQuestion;
          }
        }
      });
      return { ...state };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  questionList,
  answerList,
});
