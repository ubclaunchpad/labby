import { combineReducers } from "redux";
import { SET_LOGIC, SET_LOGIC_QUESTION, SET_LOGIC_VIEW_QUESTION } from "../actions/logicActions";

const defaultLogicQuestion = null;
const defaultLogicMap = {};

// Deprecated: This reducer is no longer used, but can offer good utility in the future
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

const currentLogicViewQuestion = (state = defaultLogicQuestion, action) => {
  switch (action.type) {
    case SET_LOGIC_VIEW_QUESTION: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const logicList = (state = defaultLogicMap, action) => {
  switch (action.type) {
    case SET_LOGIC: {
      var finalLogic = {};
      action.payload.forEach((logic) => {
        if (logic.condition_id !== null) {
          var logicForQuestion = finalLogic[logic.fk_question_id] ?? [];
          if (
            !logicForQuestion.find(
              ({ condition_id }) => condition_id === logic.condition_id
            )
          ) {
            logicForQuestion.push(logic);
            finalLogic[logic.fk_question_id] = logicForQuestion;
          }
        }
      });
      return finalLogic;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  currentLogicQuestion,
  currentLogicViewQuestion,
  logicList,
});
