import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./request-form.css";
import { appColor } from "../../constants";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";
import { LOAD_COST } from "../../redux/actions/costActions";
import MultiSelect from "../../components/MultiSelect";
import SingleSelect from "../../components/SingleSelect";
import TextAnswer from "../../components/TextAnswer";
import Dropdown from "../../components/Dropdown";
import Heading from "../../components/Heading";
import TextLine from "../../components/TextLine";
import FileInput from "../../components/FileInput";
import FileDownload from "../../components/FileDownload";
import ContactInfo from "../../components/ContactInfo";
import {
  CostEstimateCollapsed,
  CostEstimateFull,
} from "../../components/CostEstimate";
import { SUBMIT_FORM } from "../../redux/actions/formActions";
import { TOGGLE_COST_ESTIMATE } from "../../redux/actions/uiActions";

function RequestForm() {
  const dispatch = useDispatch();
  const formId = window.location.pathname.split("/")[2];
  const questions = useSelector((state) => state.questionReducer.questionList);
  const formResponses = useSelector((state) => state.formReducer.formResponses);
  const logicList = useSelector((state) => state.logicReducer.logicList);
  const hideCost = useSelector((state) => state.costEstimateReducer.hideCost);

  // Load Form Questions
  useEffect(() => {
    dispatch({ type: LOAD_QUESTION, payload: formId });
  }, [dispatch, formId]);

  // Load Cost Estimate
  useEffect(() => {
    dispatch({ type: LOAD_COST, payload: { formResponses: formResponses } });
  }, [dispatch, formResponses]);

  // Helper Function to Render Each Question
  function renderQuestion(question) {
    switch (question.question_type) {
      case "multi":
        return <MultiSelect question={question} />;
      case "single":
        return <SingleSelect question={question} />;
      case "text":
        return <TextAnswer question={question} />;
      case "dropdown":
        return <Dropdown question={question} />;
      case "heading":
        return <Heading question={question} />;
      case "textline":
        return <TextLine question={question} />;
      case "upload":
        return <FileInput question={question} />;
      case "download":
        return <FileDownload question={question} />;
      case "contact":
        return <ContactInfo question={question} />;
      default:
        return null;
    }
  }

  if (questions.length !== 0 && logicList.length !== 0) {
    return (
      <div className="requestFormPage">
        <div className="requestFormContainer">
          <div id="progressBar" style={{ zIndex: 2 }} />
          <div className="formTitle" style={{ color: appColor.primaryBlack }}>
            {questions[0].question}
          </div>
          {questions.slice(1).map((question) => {
            const logicNeeded = logicList[question.question_id] ?? [];
            var show = true;
            logicNeeded.forEach((logic) => {
              if (
                formResponses.findIndex(
                  (response) =>
                    response.question.answer_id === logic.fk_answer_id
                ) === -1
              ) {
                show = false;
              }
            });

            if (!show) {
              return null;
            }

            return (
              <div key={question.question_id}>
                <div
                  className="FormRequestQuestion"
                  style={{ color: appColor.gray }}
                >
                  {renderQuestion(question)}
                </div>
              </div>
            );
          })}
        </div>
        {hideCost ? <CostEstimateCollapsed /> : <CostEstimateFull />}
      </div>
    );
  }

  return null;
}

export default RequestForm;
