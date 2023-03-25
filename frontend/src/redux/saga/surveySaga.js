import uuid from "react-uuid";
import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { SUBMIT_SURVEY } from "../actions/formActions";
import { createTicketApi } from "../api/formApi";
import { loadSurvey, saveClinical, saveResponse, saveSurvey } from "../api/surveyApi";
import {POST_SERVICE_COST } from "../../redux/actions/ticketActions";
import { LOAD_USER_SURVEY, SET_USER_SURVEY } from "../actions/userActions";

export function* submitResponseSaga({ payload }) {
  const user = yield select((state) => state.userReducer.currentUser);
  yield call(saveSurvey, { survey_id: payload.sowId, user_id: user.user_id });
  yield call(createTicketApi, {
    task_id: payload.sowId,
    fk_survey_id: payload.sowId,
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
        sow_id: payload.sowId, 
        project_id: payload.projectId,
        name: billable.service,
        quantity: billable.quantity,
        cost: billable.cost,
        comment: "",
        createdDate: new Date(),
        completedTime: null,
        billed: false,
        billedTime: null,
        created_by: user.user_id
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
        fk_survey_id: payload.sowId,
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
          fk_survey_id: payload.sowId,
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

export function* loadSurveySaga() {
  const user = yield select((state) => state.userReducer.currentUser);
  const surveys = yield call(loadSurvey, { user_id: user.user_id });
  yield put({ type: SET_USER_SURVEY, payload: surveys.data[0] });
}

export default function* surveySaga() {
  yield takeLatest(SUBMIT_SURVEY, submitResponseSaga);
  yield takeLatest(LOAD_USER_SURVEY, loadSurveySaga);
}
