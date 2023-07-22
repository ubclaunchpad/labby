import { combineReducers } from "redux";
import {
  REPLACE_QUESTION,
  SET_ANSWER,
  SET_QUESTION,
  SET_ANSWER_BY_SURVEY,
} from "../actions/questionActions";

const defaultQuestionList = [];
const defaultAnswerList = {};
const defaultAnswerSurveyList = [];

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
      var finalAnswers = {};
      action.payload.answers.forEach((answer) => {
        if (answer.answer_id !== null && (answer.price_category === action.payload.price_category || answer.price_cateogry === undefined)) {
          var answerForQuestion = finalAnswers[answer.question_id] ?? [];
          if (
            !answerForQuestion.find(
              ({ answer_id }) => answer_id === answer.answer_id
            )
          ) {
            answerForQuestion.push(answer);
            finalAnswers[answer.question_id] = answerForQuestion;
          }
        }
      });
      return finalAnswers;
    }
    default: {
      return state;
    }
  }
};

const answerSurveyList = (state = defaultAnswerSurveyList, action) => {
  switch (action.type) {
    case SET_ANSWER_BY_SURVEY: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  questionList,
  answerList,
  answerSurveyList,
});


