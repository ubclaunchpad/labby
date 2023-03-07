import uuid from "react-uuid";
import { all, call, takeLatest, put } from "redux-saga/effects";
import { SUBMIT_FORM } from "../actions/formActions";
import { createTicketApi } from "../api/formApi";
import { saveClinical, saveResponse, saveSurvey } from "../api/surveyApi";
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
    task_title: "New Customer Request",
    task_description: "Service Request (Replace this with description)",
    task_state: "open",
  });
  yield all(
    payload.billables.map((billable) => {
      return put({ type: POST_SERVICE_COST, payload: {
        billable_id: uuid(),
        sow_id: survey_id,
        fk_project_id: payload.projectId,
        name: billable.service,
        quantity: billable.quantity,
        cost: billable.cost,
        comment: "",
        createdDate: new Date(),
        completedTime: null,
        billed: false,
        billedTime: null,
        created_by: "USER-A"
      } });
    })
  );
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
  yield all(
    Object.values(payload.clinicalResponses).map((response) => {
      if (response.sample_id !== "") {
        const clinicalBody = {
          clinical_id: response.clinical_id,
          fk_survey_id: survey_id,
          fk_question_id: response.question,
          fk_questions_answer_id: response.answer,
          sample_id: response.sample_id,
          authorized_by: response.authorized_by,
        };
        return call(saveClinical, clinicalBody);
      } else {
        return null;
      }
    })
  );
}

export default function* surveySaga() {
  yield takeLatest(SUBMIT_FORM, submitResponseSaga);
}
