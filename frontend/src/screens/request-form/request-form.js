import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./request-form.css";
import { appColor } from "../../constants";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";
import {LOAD_COST} from "../../redux/actions/costActions";
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
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";

function RequestForm() {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const formResponses = useSelector((state) => state.formReducer.formResponses);
  const logicList = useSelector((state) => state.logicReducer.logicList);

  useEffect(() => {
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch]);

  useEffect(() => {
    console.log(formResponses);
    dispatch(
      {type: LOAD_COST, 
      payload: {formResponses: formResponses },
    });
  }, [dispatch, formResponses]);


  const costEstimateView = useSelector(
    (state) => state.costEstimateReducer.costEstimateView
  );

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

  const progressBar = document.getElementById("progressBar");
  const requestFormContainer = document.querySelector(".requestFormContainer");
  if (requestFormContainer) {
    requestFormContainer.addEventListener("scroll", () => {
      let maxPageHeight =
        requestFormContainer.scrollHeight - window.innerHeight;
      progressBar.style.width = `${
        (requestFormContainer.scrollTop/ maxPageHeight) * 100
      }%`;
    });
  }

  if (questionList.length !== 0 && logicList.length !== 0) {
    return (
      <div className="requestFormPage">
        <div className="requestFormContainer">
          <div id="progressBar" style={{zIndex: 2}}></div>
          <div className="formTitle" style={{ color: appColor.primaryBlack }}>
            {questionList[0].question}
          </div>
          {questionList.slice(1).map((question) => {
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
              onClick={() => {
                var filled = true;
                questionList.forEach((question) => {
                  if (question.mandatory) {
                    if (
                      formResponses.filter(
                        (response) =>
                          response.question.question_id === question.question_id
                      ).length === 0
                    ) {
                      filled = false;
                      return;
                    }
                  }
                });
                if (filled) {
                  if (!costEstimateView) {
                    dispatch({ type: SUBMIT_FORM, payload: formResponses });
                    alert("Form Submitted");
                  } else {
                    dispatch({
                      type: TOGGLE_LOGIC,
                      payload: null
                    });
                    alert("Please Review Your Cost Estimate and Submit!");
                  }
                } else {
                  alert("Please fill out all mandatory fields");
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
        <div
            className="CostEstimate"
            style={{ color: appColor.white }}
          >
            {costEstimateView ? (
              <CostEstimateCollapsed />
            ) : (
              <CostEstimateFull/>
            )}
            </div>
      </div>
    );
  } else {
    return null;
  }
}

export default RequestForm;
