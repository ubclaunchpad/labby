import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { SET_LOADING, SET_QUESTION } from "../../actions/questionActions";
import { getQuestions } from "../../api/questionApi";
import { fetchQuestion } from "../questionSaga";
import { getLogics } from "../../api/logicApi";
import { SET_LOGIC } from "../../actions/logicActions";

it("fetches questions", () => {
  const result = {
    data: []
  };
  const samplePayload = "samplePayload";

  return expectSaga(fetchQuestion, { payload: "samplePayload" })
    .provide([
      [call(getLogics), result],
      [call(getQuestions, samplePayload), result]
    ])
    .put({ type: SET_LOGIC, payload: result.data })
    .put({ type: SET_LOADING, payload: true })
    .put({ type: SET_QUESTION, payload: result.data })
    .put({ type: SET_LOADING, payload: false })
    .run();
});

// it("save questions", () => {
//   const questions = [];

//   return expectSaga(fetchQuestion, { payload: "samplePayload" })
//     .provide([[call(getQuestions, "samplePayload"), questions]])
//     .put({ type: SET_QUESTION, payload: questions })
//     .run();
// });