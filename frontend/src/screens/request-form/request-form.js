import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./request-form.css";
import { appColor } from "../../constants";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";
import { LOAD_COST} from "../../redux/actions/costActions";
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
import ProjectSelector from "../../components/ProjectSelector";
import { ToastContainer } from "react-toastify";
import { SuccessToast, WarningToast } from "../../components/Toasts";

function RequestForm() {
  const dispatch = useDispatch();
  const formId = window.location.pathname.split("/")[2];
  const questions = useSelector((state) => state.questionReducer.questionList);
  const formResponses = useSelector((state) => state.formReducer.formResponses);
  const logicList = useSelector((state) => state.logicReducer.logicList);
  const hideCost = useSelector((state) => state.costEstimateReducer.hideCost);

  const costEstimateMap = useSelector(
    (state) => state.costEstimateReducer.costEstimateList
  );

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
      case "project":
        return <ProjectSelector question={question} />;
      default:
        return null;
    }
  }

  // Basic Form Validation and Submit
  function submitForm() { 

    var filled = true;
    questions.forEach((question) => {
      if (
        question.mandatory &&
        formResponses.filter(
          (response) => response.question.question_id === question.question_id
        ).length === 0
      ) {
        filled = false;
        return;
      }
    });
    if (filled) {
      if (hideCost) {
        dispatch({ type: TOGGLE_COST_ESTIMATE });
        WarningToast("Please Review Your Cost Estimate and Submit!");
      } else {
        const projectItem = formResponses.filter(
          (response) => response.question.project_id !== undefined
        );
        const projectId = projectItem[0].response ?? "PROJECTID-A";
        const billableList = [];
        {formResponses.map((response) => {
          const cost = costEstimateMap.get(response.question.answer_id);
          if (cost != null) {
            let quantity = response.quantity ?? 1;
            billableList.push({ 
              service: response.question.answer,
              quantity: quantity,
              cost: cost * quantity
             });
          
          }
          return null;
        })}
        dispatch({
          type: SUBMIT_FORM,
          payload: {
            formResponses,
            projectId: projectId,
            billables: billableList
          },
        });
        SuccessToast("Form Submitted!");
      }
    } else {
      WarningToast("Please fill out all mandatory fields");
    }
  }

  // Add Listener For Form Progress Bar
  const progressBar = document.getElementById("progressBar");
  const requestFormContainer = document.querySelector(".requestFormContainer");
  if (requestFormContainer) {
    requestFormContainer.addEventListener("scroll", () => {
      let maxPageHeight =
        requestFormContainer.scrollHeight - window.innerHeight;
      progressBar.style.width = `${
        (requestFormContainer.scrollTop / maxPageHeight) * 100
      }%`;
    });
  }

  if (questions.length !== 0 && logicList.length !== 0) {
    return (
      <div className="requestFormPage">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="light"
        />
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
          <div className="FormSubmit">
            <button
              className="FormSubmitButton"
              style={{
                backgroundColor: appColor.primaryLight,
                color: appColor.white,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = appColor.primary;
                e.target.style.color = appColor.white;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = appColor.primaryLight;
                e.target.style.color = appColor.white;
              }}
              onClick={submitForm}
            >
              Submit
            </button>
          </div>
        </div>
        {hideCost ? <CostEstimateCollapsed /> : <CostEstimateFull />}
      </div>
    );
  }

  return null;
}

export default RequestForm;
