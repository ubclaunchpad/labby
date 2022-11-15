import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./request-form.css";
import { renderQuestion } from "../../components/FormBuilder";
import { clsx } from "clsx";
import { appColor } from "../../constants";
import Divider from "../../components/Divider";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";

function RequestForm() {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  useEffect(() => {
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch]);

  if (questionList.length !== 0) {
    return (
      <div className="requestFormPage">
        <div className="requestFormContainer">
          <div className="formTitle" style={{ color: appColor.primaryBlack }}>
            {questionList[0].question}
          </div>
          {questionList.slice(1).map((question) => {
            const isHeadingOrTextline =
              question.question_type === "heading" ||
              question.question_type === "textline";
            return (
              <div key={question.question_id}>
                <div
                  className={clsx(
                    "FormBuilderQuestion",
                    isHeadingOrTextline && "FormBuilderQuestion--short"
                  )}
                  style={{ color: appColor.gray }}
                >
                  {renderQuestion(question)}
                </div>
                <Divider />
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
