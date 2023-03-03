import { combineReducers } from "redux";
import {
  ADD_QUESTION,
  ADD_RESPONSE,
  REMOVE_RESPONSE,
  ADD_FULLNAME_RESPONSE,
  REMOVE_FULLNAME_RESPONSE,
  ADD_INSTITUTION_RESPONSE,
  REMOVE_INSTITUTION_RESPONSE,
  ADD_EMAIL_RESPONSE,
  REMOVE_EMAIL_RESPONSE,
  ADD_PHONE_RESPONSE,
  REMOVE_PHONE_RESPONSE,
  REMOVE_SINGLE_RESPONSE,
  SET_FORMS,
  REMOVE_PROJECT_RESPONSE,
  SUBMIT_FORM,
} from "../actions/formActions";

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
const defaultFormList = [];
const defaultAnswerList = [];
const defaultFormSubmissions = [
  // {
  //   formResponses: [],
  //   projectId: "",
  //   billables: [],
  // },
];

const formQuestions = (state = defaultQuestionlist, action) => {
  switch (action.type) {
    case ADD_QUESTION: {
      if(Array.isArray(action.payload)){
        action.payload.forEach((question) => {
          if (!state[question.question_type].includes(question)) {
            state[question.question_type].push(question);
          }
        });
      } else {
        state[action.payload.question_type].push(action.payload);
      }
      return {...state};
    }
    default: {
      return state;
    }
  }
};

const formResponses = (state = defaultAnswerList, action) => {
  switch (action.type) {
    case ADD_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response !== action.payload.response
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response !== action.payload.response
      );
      return [...state];
    }
    case REMOVE_SINGLE_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !== action.payload.question.question_id
      );
      return [...state];
    }
    case REMOVE_PROJECT_RESPONSE: {
      state = state.filter(
        (response) => response.question.project_id === undefined
      );
      return [...state];
    }
    case ADD_FULLNAME_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response.split("_")[0] !== "FULLNAME"
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_FULLNAME_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response.split("_")[0] !== "FULLNAME"
      );
      return [...state];
    }
    case ADD_INSTITUTION_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response.split("_")[0] !== "INSTITUTION"
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_INSTITUTION_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response.split("_")[0] !== "INSTITUTION"
      );
      return [...state];
    }
    case ADD_EMAIL_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response.split("_")[0] !== "EMAIL"
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_EMAIL_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response.split("_")[0] !== "EMAIL"
      );
      return [...state];
    }
    case ADD_PHONE_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response.split("_")[0] !== "PHONE"
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_PHONE_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
            action.payload.question.question_id ||
          response.response.split("_")[0] !== "PHONE"
      );
      return [...state];
    }
    default: {
      return state;
    }
  }
};

const formList = (state = defaultFormList, action) => {
  switch (action.type) {
    case SET_FORMS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const formSubmissions = (state = defaultFormSubmissions, action) => {
  switch (action.type) {
    case SUBMIT_FORM: {
      state.push(action.payload)
      // TODO: save submitted forms to backend
      return state;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  formQuestions,
  formResponses,
  formList,
  formSubmissions,
});
