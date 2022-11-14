import { combineReducers } from "redux";
import { ADD_QUESTION, ADD_RESPONSE } from "../actions/formActions";

const defaultQuestionlist = {
  multi: [],
  single: [],
  text: [],
  dropdown: [],
  heading: [],
  textline: [],
  upload: [],
  download: [],
  contact: [],
};

const defaultAnswerList = {};

const formQuestions = (state = defaultQuestionlist, action) => {
  switch (action.type) {
    case ADD_QUESTION: {
      action.payload.forEach((question) => {
        if (!state[question.question_type].includes(question)) {
          state[question.question_type].push(question);
        }
      });
      return [...state];
    }
    default: {
      return state;
    }
  }
};

const formResponses = (state = defaultAnswerList, action) => {
  switch (action.type) {
    case ADD_RESPONSE: {
      var answerList = [];
      action.payload.forEach((questions_answer) => {
        answerList.push(questions_answer);
      });
      return answerList;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({ formQuestions, formResponses });
