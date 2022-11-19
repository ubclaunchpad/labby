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
import CostEstimate from "../../components/CostEstimate";

function RequestForm() {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

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
            {questionList[0].question }
          </div>
             <div
                  className="CostEstimate"
                  style={{ color: appColor.gray }}
                >
                   {CostEstimate()}
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
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default RequestForm;
