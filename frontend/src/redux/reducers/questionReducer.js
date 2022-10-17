import { combineReducers } from 'redux';
import { SET_QUESTION } from '../actions/questionActions';

const defaultQuestionList = [];

const questionListReducer = (state = defaultQuestionList, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return {
        questionList: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
    questionListReducer,
});