import { combineReducers } from "redux";
import { ADD_QUESTION, ADD_RESPONSE, REMOVE_RESPONSE } from "../actions/formActions";

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

const defaultAnswerList = [];

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
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_RESPONSE: {
      state = state.filter((response) => response.answer_id !== action.payload);
      return [...state];
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({ formQuestions, formResponses });
