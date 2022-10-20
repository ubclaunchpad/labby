import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { SET_QUESTION } from "../../actions/questionActions";
import { getQuestions } from "../../api/questionApi";
import { fetchQuestion } from "../questionSaga";

it("fetches questions", () => {
  const questions = [];

  return expectSaga(fetchQuestion, { payload: "samplePayload" })
    .provide([[call(getQuestions, "samplePayload"), questions]])
    .put({ type: SET_QUESTION, payload: questions })
    .run();
});