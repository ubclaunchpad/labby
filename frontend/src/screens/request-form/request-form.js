import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./request-form.css";
import { appColor } from "../../constants";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";
import MultiSelect from "../../components/MultiSelect";
import SingleSelect from "../../components/SingleSelect";
import TextAnswer from "../../components/TextAnswer";
import Dropdown from "../../components/Dropdown";
import Heading from "../../components/Heading";
import TextLine from "../../components/TextLine";
import FileInput from "../../components/FileInput";
import FileDownload from "../../components/FileDownload";
import ContactInfo from "../../components/ContactInfo";
import { SUBMIT_FORM } from "../../redux/actions/formActions";

function RequestForm() {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const formResponses = useSelector((state) => state.formReducer.formResponses);

  useEffect(() => {
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch]);

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

  if (questionList.length !== 0) {
    return (
      <div className="requestFormPage">
        <div className="requestFormContainer">
          <div className="formTitle" style={{ color: appColor.primaryBlack }}>
            {questionList[0].question}
          </div>
          {questionList.slice(1).map((question) => {
            return (
              <div key={question.question_id}>
                <div
                  className="FormResponseQuestion"
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
                dispatch({ type: SUBMIT_FORM, payload: formResponses });
                alert("Form Submitted");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default RequestForm;
