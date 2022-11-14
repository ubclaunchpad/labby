import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import "./request-form.css";
import { renderQuestion } from "../../components/FormBuilder";
import { clsx } from "clsx";
import { appColor } from "../../constants";

export const RequestForm = () => {
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  return (
    <div className="requestFormPage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="requestFormContainer">
        <div className="formTitle">{questionList[0].question}</div>
        {questionList.slice(1).map((question, index) => {
          const isHeadingOrTextline =
            question.question_type === "heading" ||
            question.question_type === "textline";
          return (
            <div>
              <div
                className={clsx(
                  "FormBuilderQuestion",
                  isHeadingOrTextline && "FormBuilderQuestion--short"
                )}
                key={question.question_id}
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
};
