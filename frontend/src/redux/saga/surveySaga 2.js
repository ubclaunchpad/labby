import uuid from "react-uuid";
import { all, call, takeLatest } from "redux-saga/effects";
import { SUBMIT_FORM } from "../actions/formActions";
import { saveResponse, saveSurvey } from "../api/surveyApi";

export function* submitResponseSaga({ payload }) {
  const survey_id = uuid();
  yield call(saveSurvey, { survey_id: survey_id });
  yield all(
    payload.map((response) => {
      const isChoice =
        response.question.type === "multi" ||
        response.question.type === "single";
      const responseBody = {
        answer_id: response.id,
        fk_survey_id: survey_id,
        fk_question_id: response.question.question_id,
        fk_questions_answer_id: isChoice
          ? response.response
          : response.question.answer_id,
        answer: isChoice ? true : response.response,
      };
      return call(saveResponse, responseBody);
    })
  );
}

export default function* surveySaga() {
  yield takeLatest(SUBMIT_FORM, submitResponseSaga);
}
