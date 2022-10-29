import { useSelector } from "react-redux";
import { appColor } from "../../constants";
import FormTitle from "./FormTitle";
import "./index.css";

function FormBuilder() {
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  function renderQuestion(question) {
    switch (question.question_type) {
      case "multi":
        return (
          <div
            className="FormBuilderQuestion"
            key={question.question_id + question.answer_id}
            style={{ color: appColor.gray }}
          >
            {question.question + " @ Q" + question.position_index}
          </div>
        );
      case "single":
        return (
          <div
            className="FormBuilderQuestion"
            key={question.question_id + question.answer_id}
            style={{ color: appColor.gray }}
          >
            {question.question + " @ Q" + question.position_index}
          </div>
        );
      case "text":
        return (
          <div
            className="FormBuilderQuestion"
            key={question.question_id + question.answer_id}
            style={{ color: appColor.gray }}
          >
            {question.question + " @ Q" + question.position_index}
          </div>
        );
      case "dropdown":
        return (
          <div
            className="FormBuilderQuestion"
            key={question.question_id + question.answer_id}
            style={{ color: appColor.gray }}
          >
            {question.question + " @ Q" + question.position_index}
          </div>
        );
      case "heading":
        return (
          <div
            className="FormBuilderQuestion"
            key={question.question_id + question.answer_id}
            style={{ color: appColor.gray }}
          >
            {question.question + " @ Q" + question.position_index}
          </div>
        );
      case "textline":
        return (
          <div
            className="FormBuilderQuestion"
            key={question.question_id + question.answer_id}
            style={{ color: appColor.gray }}
          >
            {question.question + " @ Q" + question.position_index}
          </div>
        );
      case "upload":
        return (
          <div
            className="FormBuilderQuestion"
            key={question.question_id + question.answer_id}
            style={{ color: appColor.gray }}
          >
            {question.question + " @ Q" + question.position_index}
          </div>
        );
      case "download":
        return (
          <div
            className="FormBuilderQuestion"
            key={question.question_id + question.answer_id}
            style={{ color: appColor.gray }}
          >
            {question.question + " @ Q" + question.position_index}
          </div>
        );
      case "contact":
        return (
          <div
            className="FormBuilderQuestion"
            key={question.question_id + question.answer_id}
            style={{ color: appColor.gray }}
          >
            {question.question + " @ Q" + question.position_index}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="FormBuilderHeader FormBuilder">
        <div className="FormBuilderTitle" style={{ color: appColor.gray }}>
          Form Builder
        </div>
        <div className="FormTitle">
          {FormTitle()}
          <div className="FormPreview">
            <button
              className="FormPreviewButton"
              style={{
                backgroundColor: appColor.lightGray,
                color: appColor.gray,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#4CAF50";
                e.target.style.color = "#FFFFFF";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = appColor.lightGray;
                e.target.style.color = appColor.gray;
              }}
              onClick={() => {
                alert("Preview Not Available Yet!");
              }}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
      <div className="ScrollBox FormBuilder">
        <div className="FormBuilderOutline">
          {questionList.length ? (
            questionList.slice(1).map((question) => renderQuestion(question))
          ) : (
            <div className="DragAndDropText" style={{ color: appColor.gray }}>
              Drag and drop to add components
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormBuilder;
