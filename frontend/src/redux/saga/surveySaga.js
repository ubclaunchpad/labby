import uuid from "react-uuid";
import { all, call, takeLatest, put } from "redux-saga/effects";
import { SUBMIT_SURVEY } from "../actions/formActions";
import { createTicketApi } from "../api/formApi";
import { saveResponse, saveSurvey } from "../api/surveyApi";
import {POST_SERVICE_COST } from "../../redux/actions/ticketActions";

export function* submitResponseSaga({ payload }) {
  const survey_id = uuid();
  yield call(saveSurvey, { survey_id: survey_id });
  yield call(createTicketApi, {
    task_id: survey_id,
    fk_form_id:
      payload.formResponses[0].question.fk_form_id ??
      payload.formResponses[1].question.fk_form_id,
    fk_project_id: payload.projectId,
    task_title: "Harin's Request",
    task_description: "Harin's Service Request (Replace this with description)",
    task_state: "open",
  });
  yield all(
    payload.billables.map((billable) => {
      return put({ type: POST_SERVICE_COST, payload: {
        billable_id: uuid(),
        sow_id: survey_id, 
        project_id: payload.projectId,
        name: billable.service,
        quantity: billable.quantity,
        cost: billable.cost,
        createdDate: new Date(),
        completedTime: null,
        billed: false,
        billedTime: null,
        createdBy: "USER-A"
      } });
    })
  );
  localStorage.setItem("currentSurveyId", survey_id);
  
  yield all(
    payload.formResponses.map((response) => { 
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
  yield takeLatest(SUBMIT_SURVEY, submitResponseSaga);
}
