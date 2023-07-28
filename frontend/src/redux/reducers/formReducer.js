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
  REPLACE_PROJECT_RESPONSE,
  SUBMIT_FORM,
  ADD_OTHER_RESPONSE,
  REMOVE_OTHER_RESPONSE,
  ADD_CLINICAL_RESPONSE,
  SET_PUBLISHED_FORMS,
  ADD_FINANCIAL_RESPONSE,
  REMOVE_FINANCIAL_RESPONSE,
  ADD_INVESTIGATOR_RESPONSE,
  REMOVE_INVESTIGATOR_RESPONSE,
  ADD_WORKTAG_RESPONSE,
  REMOVE_WORKTAG_RESPONSE,
  ADD_ADDRESS_RESPONSE,
  REMOVE_ADDRESS_RESPONSE,
  ADD_ACCOUNT_RESPONSE,
  REMOVE_ACCOUNT_RESPONSE,
  REMOVE_ALL_RESPONSE,
  SET_DRAFTS,
  SET_ALL_DRAFTS,
  REMOVE_CLINICAL_RESPONSE,
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
const defaultFormSubmissions = [];
const defaultClinicalResponses = {};

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
          response.question.answer_id !== action.payload.question.answer_id
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
    case REPLACE_PROJECT_RESPONSE: {
      state = state.filter(
        (response) => response.question.project_id === undefined
      );
      state.push(action.payload);
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
    case ADD_FINANCIAL_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "FINANCIAL"
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_FINANCIAL_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "FINANCIAL"
      );
      return [...state];
    }
    case ADD_INVESTIGATOR_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "INVESTIGATOR"
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_INVESTIGATOR_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "INVESTIGATOR"
      );
      return [...state];
    }
    case ADD_WORKTAG_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "WORKTAG"
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_WORKTAG_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "WORKTAG"
      );
      return [...state];
    }
    case ADD_ADDRESS_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "ADDRESS"
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_ADDRESS_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "ADDRESS"
      );
      return [...state];
    }
    case ADD_ACCOUNT_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "ACCOUNT"
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_ACCOUNT_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "ACCOUNT"
      );
      return [...state];
    }
    case ADD_OTHER_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.question.answer_id !== action.payload.question.answer_id
      );
      state.push(action.payload);
      return [...state];
    }
    case REMOVE_OTHER_RESPONSE: {
      state = state.filter(
        (response) =>
          response.question.question_id !==
          action.payload.question.question_id ||
          response.response.split("_")[0] !== "OTHER"
      );
      return [...state];
    }
    case REMOVE_ALL_RESPONSE: {
      state = [];
      return state;
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

const publishedFormList = (state = defaultFormList, action) => {
  switch (action.type) {
    case SET_PUBLISHED_FORMS: {
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
      state.push(action.payload);
      //defaultAnswerList = [];
      // TODO: save submitted forms to backend
      return state;
    }
    default: {
      return state;
    }
  }
};

const clinicalResponses = (state = defaultClinicalResponses, action) => {
  switch (action.type) {
    case ADD_CLINICAL_RESPONSE: {
      state[action.payload.clinical_id] = action.payload;
      return { ...state };
    }
    case REMOVE_CLINICAL_RESPONSE: {
      delete state[action.payload];
      return { ...state };
    }
    default: {
      return state;
    }
  }
};

const draftList = (state = [], action) => {
  switch (action.type) {
    case SET_DRAFTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const allDraftList = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_DRAFTS: {
      return action.payload;
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
  clinicalResponses,
  publishedFormList,
  draftList,
  allDraftList
});
